import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Il testo è obbligatorio" }, { status: 400 })
    }

    // Qui potresti integrare un servizio TTS più avanzato come Google Cloud TTS
    // Per ora restituiamo solo un successo, poiché la sintesi vocale avviene lato client
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Errore durante la sintesi vocale:", error)
    return NextResponse.json({ error: "Si è verificato un errore durante la sintesi vocale" }, { status: 500 })
  }
}

