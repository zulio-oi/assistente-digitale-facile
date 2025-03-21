import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ServiziPage() {
  const servizi = [
    {
      id: "spid",
      title: "SPID",
      description: "Sistema Pubblico di Identità Digitale",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-600"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
      ),
      content: "Accedi ai servizi online della Pubblica Amministrazione con un'unica identità digitale.",
    },
    {
      id: "io",
      title: "App IO",
      description: "L'app dei servizi pubblici",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-600"
        >
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <circle cx="12" cy="14" r="4" />
          <path d="M12 6h.01" />
        </svg>
      ),
      content: "Ricevi messaggi, promemoria di scadenze, comunicazioni e pagamenti dalla Pubblica Amministrazione.",
    },
    {
      id: "anpr",
      title: "ANPR",
      description: "Anagrafe Nazionale Popolazione Residente",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-600"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      content: "Richiedi certificati anagrafici online e verifica i tuoi dati anagrafici.",
    },
    {
      id: "cie",
      title: "CIE",
      description: "Carta d'Identità Elettronica",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-600"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      content: "Documento di identità elettronico che può essere utilizzato anche per accedere ai servizi online.",
    },
    {
      id: "pec",
      title: "PEC",
      description: "Posta Elettronica Certificata",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-600"
        >
          <path d="M21 5H3v14h18V5Z" />
          <path d="m3 5 9 9 9-9" />
        </svg>
      ),
      content: "Sistema di posta elettronica che garantisce l'invio e la ricezione di messaggi con valore legale.",
    },
    {
      id: "fse",
      title: "FSE",
      description: "Fascicolo Sanitario Elettronico",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-600"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
      content: "Strumento digitale che raccoglie la tua storia sanitaria, referti, ricette e vaccinazioni.",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-blue-600 text-white p-4 md:p-6">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Servizi Digitali</h1>
          <p className="mt-1 md:mt-2 text-sm md:text-base">Esplora i servizi digitali disponibili per i cittadini</p>
        </div>
      </header>

      <main className="container mx-auto py-4 md:py-8 px-3 md:px-4">
        <section className="max-w-4xl mx-auto mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">I nostri servizi digitali</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {servizi.map((servizio) => (
              <Card key={servizio.id} className="h-full flex flex-col">
                <CardHeader className="pb-2 md:pb-4">
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <div className="bg-blue-100 p-2 rounded-full">{servizio.icon}</div>
                    <CardTitle className="text-lg md:text-xl">{servizio.title}</CardTitle>
                  </div>
                  <CardDescription className="text-xs md:text-sm">{servizio.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow text-sm md:text-base">
                  <p>{servizio.content}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full text-sm md:text-base">
                    <Link href={`/#${servizio.id}`}>Scopri di più</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="pb-2 md:pb-4">
              <CardTitle className="text-center text-lg md:text-xl">Hai bisogno di assistenza?</CardTitle>
              <CardDescription className="text-center text-sm md:text-base">
                Siamo qui per aiutarti a utilizzare i servizi digitali
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4 text-sm md:text-base">
                Se hai difficoltà a utilizzare uno dei servizi digitali, non esitare a contattarci. I nostri
                facilitatori digitali sono a tua disposizione per guidarti passo dopo passo.
              </p>
              <Button asChild className="text-sm md:text-base">
                <Link href="/">Torna alla home</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-gray-100 py-4 md:py-6 mt-8 md:mt-12">
        <div className="container mx-auto px-3 md:px-4 text-center text-gray-600">
          <p className="text-sm md:text-base">
            © {new Date().getFullYear()} Digitale Facile - Nuovo Circondario Imolese
          </p>
          <p className="mt-1 md:mt-2 text-xs md:text-sm">
            Un servizio per aiutare tutti i cittadini ad utilizzare i servizi digitali
          </p>
        </div>
      </footer>
    </div>
  )
}

