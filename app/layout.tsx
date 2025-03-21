import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Titillium_Web } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  variable: "--font-titillium-web",
})

export const metadata: Metadata = {
  title: "Assistente Digitale Facile - Chatbot",
  description: "Assistente virtuale per i servizi digitali del Nuovo Circondario Imolese",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <body className={titilliumWeb.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'