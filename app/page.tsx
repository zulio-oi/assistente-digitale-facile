"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { VolumeIcon as VolumeUp, Send } from "lucide-react"

export default function ChatBot() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [lastReply, setLastReply] = useState("")
  const [useAlternativeApi, setUseAlternativeApi] = useState(false)

  // Aggiunge un messaggio di benvenuto all'avvio
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content:
          "Ciao! Sono l'Assistente Digitale Facile. Come posso aiutarti con i servizi digitali oggi? Puoi chiedermi informazioni su SPID, App IO, ANPR, CIE, PEC, FSE o altri servizi digitali.",
      },
    ])
    setLastReply(
      "Ciao! Sono l'Assistente Digitale Facile. Come posso aiutarti con i servizi digitali oggi? Puoi chiedermi informazioni su SPID, App IO, ANPR, CIE, PEC, FSE o altri servizi digitali.",
    )
  }, [])

  // Scorre automaticamente verso il basso quando arrivano nuovi messaggi
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Funzione per inviare un messaggio
  const sendMessage = async () => {
    if (!input.trim()) return

    // Resetta eventuali errori precedenti
    setError(null)

    // Aggiunge il messaggio dell'utente
    const userMessage = input
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setInput("")
    setIsLoading(true)

    try {
      console.log("Invio messaggio:", userMessage)

      // Sceglie l'endpoint API da utilizzare
      const apiEndpoint = useAlternativeApi ? "/api/chat-alternative" : "/api/chat"

      // Chiamata all'API
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })

      console.log("Risposta ricevuta, status:", response.status)

      // Gestione delle risposte non-JSON
      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        console.error("Errore nel parsing JSON della risposta:", jsonError)

        // Prova a leggere il testo della risposta per il debug
        const textResponse = await response.text()
        console.error("Risposta testuale:", textResponse)

        // Se la prima API fallisce, prova con l'alternativa
        if (!useAlternativeApi) {
          console.log("Tentativo con API alternativa...")
          setUseAlternativeApi(true)
          throw new Error("Cambio a API alternativa")
        }

        throw new Error("Il server ha restituito una risposta non valida. Contatta l'assistenza.")
      }

      if (!response.ok) {
        // Se la prima API fallisce, prova con l'alternativa
        if (!useAlternativeApi && response.status >= 500) {
          console.log("Tentativo con API alternativa a causa di errore server...")
          setUseAlternativeApi(true)
          throw new Error("Cambio a API alternativa")
        }

        throw new Error(data.error || "Errore nella risposta del server")
      }

      if (!data.reply) {
        throw new Error("Risposta vuota dal server")
      }

      console.log("Risposta elaborata:", data.reply.substring(0, 50) + "...")

      // Aggiunge la risposta dell'assistente
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
      setLastReply(data.reply)

      // Legge la risposta ad alta voce
      speak(data.reply)
    } catch (error: any) {
      console.error("Errore completo:", error)

      // Se stiamo cambiando API, riprova il messaggio
      if (error.message === "Cambio a API alternativa") {
        console.log("Riprovo con API alternativa...")
        // Rimuove l'ultimo messaggio dell'utente per evitare duplicati
        setMessages((prev) => prev.slice(0, -1))
        setInput(userMessage)
        setIsLoading(false)
        // Riprova con l'API alternativa
        setTimeout(() => sendMessage(), 500)
        return
      }

      const errorMessage = error.message || "Si è verificato un errore sconosciuto"
      setError(errorMessage)

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Mi dispiace, si è verificato un errore: ${errorMessage}. Riprova più tardi o contatta l'assistenza al numero 0542 603265.`,
        },
      ])
    } finally {
      if (error?.message !== "Cambio a API alternativa") {
        setIsLoading(false)
      }
    }
  }

  // Funzione per gestire l'invio con il tasto Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage()
    }
  }

  // Funzione per la sintesi vocale
  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        // Cancella eventuali sintesi vocali in corso
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = "it-IT"

        // Cerca una voce italiana
        const voices = window.speechSynthesis.getVoices()
        const italianVoice = voices.find((voice) => voice.lang.includes("it-IT"))
        if (italianVoice) {
          utterance.voice = italianVoice
        }

        window.speechSynthesis.speak(utterance)
      } catch (speechError) {
        console.error("Errore nella sintesi vocale:", speechError)
        // Non blocchiamo l'applicazione se la sintesi vocale fallisce
      }
    }
  }

  // Funzione per riprodurre l'ultima risposta
  const speakLast = () => {
    if (lastReply) {
      speak(lastReply)
    }
  }

  // Carica le voci disponibili all'avvio
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // Forza il caricamento delle voci
      speechSynthesis.getVoices()

      // Alcuni browser richiedono questo evento per caricare le voci
      speechSynthesis.onvoiceschanged = () => {
        speechSynthesis.getVoices()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Assistente Digitale Facile
          </h1>
          <p className="mt-1 text-sm">Aiuto per i servizi digitali del Nuovo Circondario Imolese</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-4 px-3 flex flex-col">
        <Card className="flex-grow flex flex-col max-w-4xl mx-auto w-full">
          <div className="p-3 bg-blue-50 border-b text-sm text-blue-700">
            <p>Vuoi che parli anche in dialetto romagnolo? Scrivi "parla in dialetto" oppure "traduci in romagnolo".</p>
          </div>

          <div className="flex-grow p-4 overflow-y-auto max-h-[calc(100vh-280px)]" style={{ scrollBehavior: "smooth" }}>
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block max-w-[85%] md:max-w-[75%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block max-w-[85%] md:max-w-[75%] p-3 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 my-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <p className="font-medium">Si è verificato un errore:</p>
                <p>{error}</p>
                <p className="mt-2">Riprova più tardi o contatta l'assistenza al numero 0542 603265.</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Scrivi qui la tua domanda..."
                disabled={isLoading}
                className="flex-grow"
              />
              <Button onClick={sendMessage} disabled={isLoading || !input.trim()} aria-label="Invia messaggio">
                <Send className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-3 flex justify-center">
              <Button
                variant="outline"
                onClick={speakLast}
                className="text-sm"
                disabled={!lastReply}
                aria-label="Ascolta l'ultima risposta"
              >
                <VolumeUp className="h-4 w-4 mr-2" />
                Ascolta di nuovo
              </Button>
            </div>
          </div>
        </Card>
      </main>

      <footer className="bg-gray-100 py-4 mt-auto">
        <div className="container mx-auto px-3 text-center text-gray-600">
          <p className="text-sm">© {new Date().getFullYear()} Digitale Facile - Nuovo Circondario Imolese</p>
          <p className="mt-1 text-xs">Per assistenza: 0542 603265 | digitalefacile@nuovocircondarioimolese.it</p>
        </div>
      </footer>
    </div>
  )
}

