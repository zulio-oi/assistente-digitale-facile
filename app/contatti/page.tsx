import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Globe, MapPin } from "lucide-react"
import Link from "next/link"

export default function ContattiPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-blue-600 text-white p-4 md:p-6">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Contatti</h1>
          <p className="mt-1 md:mt-2 text-sm md:text-base">Come contattare il servizio Digitale Facile</p>
        </div>
      </header>

      <main className="container mx-auto py-4 md:py-8 px-3 md:px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <section>
            <Card className="h-full">
              <CardHeader className="pb-2 md:pb-4">
                <CardTitle className="text-lg md:text-xl">I nostri contatti</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Puoi contattarci attraverso diversi canali
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-sm md:text-base">Telefono</h3>
                      <a href="tel:0542603265" className="text-base md:text-lg text-blue-600">
                        0542 603265
                      </a>
                      <p className="text-xs md:text-sm text-gray-500">Dal lunedì al venerdì, 9:00-18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
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
                      className="text-green-600 mt-1 md:h-6 md:w-6"
                    >
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M9.5 13.5c.5 1 1.5 1 2 1s1.5 0 2-1" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-sm md:text-base">WhatsApp</h3>
                      <Link
                        href="https://api.whatsapp.com/send?phone=393347987068"
                        className="text-green-600 hover:underline text-sm md:text-base"
                      >
                        Invia un messaggio
                      </Link>
                      <p className="text-xs md:text-sm text-gray-500">Risposta entro 24 ore</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-sm md:text-base">Email</h3>
                      <Link
                        href="mailto:digitalefacile@nuovocircondarioimolese.it"
                        className="text-blue-600 hover:underline break-all text-sm md:text-base"
                      >
                        digitalefacile@nuovocircondarioimolese.it
                      </Link>
                      <p className="text-xs md:text-sm text-gray-500">Risposta entro 48 ore</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-sm md:text-base">Sito Web</h3>
                      <Link
                        href="https://digifacile.vado.li"
                        className="text-blue-600 hover:underline text-sm md:text-base"
                      >
                        digifacile.vado.li
                      </Link>
                      <p className="text-xs md:text-sm text-gray-500">
                        Visita il nostro sito per maggiori informazioni
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-sm md:text-base">Sportelli sul territorio</h3>
                      <p className="text-sm md:text-base">
                        Siamo presenti con sportelli di assistenza in tutti i comuni del Circondario Imolese
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">Consulta il sito per orari e sedi</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card>
              <CardHeader className="pb-2 md:pb-4">
                <CardTitle className="text-lg md:text-xl">Scrivici</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Compila il modulo per ricevere assistenza
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-3 md:space-y-4">
                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    <div>
                      <label htmlFor="nome" className="block text-xs md:text-sm font-medium mb-1">
                        Nome e Cognome
                      </label>
                      <Input id="nome" placeholder="Inserisci il tuo nome e cognome" className="text-sm md:text-base" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs md:text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="La tua email" className="text-sm md:text-base" />
                    </div>

                    <div>
                      <label htmlFor="telefono" className="block text-xs md:text-sm font-medium mb-1">
                        Telefono
                      </label>
                      <Input id="telefono" placeholder="Il tuo numero di telefono" className="text-sm md:text-base" />
                    </div>

                    <div>
                      <label htmlFor="servizio" className="block text-xs md:text-sm font-medium mb-1">
                        Servizio di interesse
                      </label>
                      <select
                        id="servizio"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm md:text-base"
                      >
                        <option value="">Seleziona un servizio</option>
                        <option value="spid">SPID</option>
                        <option value="io">App IO</option>
                        <option value="anpr">ANPR</option>
                        <option value="cie">CIE</option>
                        <option value="pec">PEC</option>
                        <option value="fse">FSE</option>
                        <option value="altro">Altro</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="messaggio" className="block text-xs md:text-sm font-medium mb-1">
                        Messaggio
                      </label>
                      <Textarea
                        id="messaggio"
                        placeholder="Descrivi la tua richiesta"
                        rows={4}
                        className="text-sm md:text-base"
                      />
                    </div>

                    <div className="flex items-start gap-2 mt-1 md:mt-2">
                      <input type="checkbox" id="privacy" className="mt-1" />
                      <label htmlFor="privacy" className="text-xs md:text-sm">
                        Acconsento al trattamento dei dati personali ai sensi del GDPR 2016/679
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full text-sm md:text-base">
                    Invia richiesta
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <footer className="bg-gray-100 py-4 md:py-6 mt-8 md:mt-12">
        <div className="container mx-auto px-3 md:px-4 text-center text-gray-600">
          <p className="text-sm md:text-base">
            © {new Date().getFullYear()} Digitale Facile - Nuovo Circondario Imolese
          </p>
          <p className="mt-1 md:mt-2 text-xs md:text-sm">
            Un servizio per aiutare tutti i cittadini ad utilizzare i servizi digitali
          </p>
          <div className="mt-3 md:mt-4">
            <Link href="/" className="text-blue-600 hover:underline mx-2 text-xs md:text-sm">
              Home
            </Link>
            <Link href="/servizi" className="text-blue-600 hover:underline mx-2 text-xs md:text-sm">
              Servizi
            </Link>
            <Link href="/contatti" className="text-blue-600 hover:underline mx-2 text-xs md:text-sm">
              Contatti
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

