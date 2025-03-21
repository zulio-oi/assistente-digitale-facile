import { NextResponse } from "next/server"

// Utilizziamo fetch direttamente invece della libreria OpenAI
export async function POST(request: Request) {
  try {
    // Verifica che la chiave API sia configurata
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY non configurata")
      return NextResponse.json({ error: "Configurazione del server incompleta: chiave API mancante" }, { status: 500 })
    }

    // Estrai il messaggio dalla richiesta
    let message
    try {
      const body = await request.json()
      message = body.message
    } catch (error) {
      console.error("Errore nel parsing del JSON della richiesta:", error)
      return NextResponse.json({ error: "Formato della richiesta non valido" }, { status: 400 })
    }

    // Verifica che il messaggio sia presente
    if (!message) {
      return NextResponse.json({ error: "Il messaggio è obbligatorio" }, { status: 400 })
    }

    console.log("Invio richiesta a OpenAI API direttamente...")

    try {
      // Chiamata diretta all'API OpenAI usando fetch
      const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `Sei un facilitatore digitale AI ispirato al progetto "Digitale Facile" del Nuovo Circondario Imolese. 
              Il tuo compito è aiutare, con gentilezza e linguaggio semplice, persone con scarse competenze digitali a usare servizi pubblici online come SPID, app IO, ANPR, CIE, PEC, FSE e altri strumenti digitali di base. 
              Rispondi con istruzioni chiare e passo passo. Se l'utente ha bisogno di aiuto umano, invitalo a contattare: 
              Telefono 0542 603265, WhatsApp 334 7987068, Email digitalefacile@nuovocircondarioimolese.it, oppure il sito digifacile.vado.li. 
              Non fornire consulenze fiscali, mediche o legali. Non gestire credenziali. Usa uno stile empatico, rispettoso e concreto.
              
              Se l'utente chiede di "parlare in dialetto" o "tradurre in romagnolo", aggiungi alla fine della tua risposta una traduzione in dialetto romagnolo.`,
            },
            { role: "user", content: message },
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      })

      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json()
        throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`)
      }

      const data = await openaiResponse.json()
      console.log("Risposta ricevuta da OpenAI API")

      // Estrai la risposta
      const reply = data.choices[0].message.content

      // Restituisci la risposta
      return NextResponse.json({ reply })
    } catch (openaiError: any) {
      console.error("Errore specifico OpenAI API:", openaiError)

      return NextResponse.json({ error: "Errore nel servizio di intelligenza artificiale" }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Errore generale durante la gestione della richiesta:", error)
    return NextResponse.json({ error: "Si è verificato un errore interno del server" }, { status: 500 })
  }
}

