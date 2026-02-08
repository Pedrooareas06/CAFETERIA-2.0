import {
  consumeStream,
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";
import { openai } from "@ai-sdk/openai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided" }), {
        status: 400,
      });
    }

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: `Você é o assistente virtual do Café Aroma, uma cafeteria artesanal premium em São Paulo.

Informações sobre o Café Aroma:
- Localização: Rua do Café Gostoso, 123 - Centro, São Paulo - SP
- Telefone/WhatsApp: (11) 96712-5432
- Email: contato@cafearoma.com.br
- Horário: Seg-Sex 7h-20h, Sab-Dom 8h-18h
- Fundado em 2014, mais de 10 anos de experiência

Cardápio:
- Espresso: R$ 8,00 - Café puro e intenso, preparado na pressão perfeita
- Cappuccino: R$ 12,00 - Cremoso e suave, com espuma de leite perfeita
- Café Gelado: R$ 10,00 - Refrescante e saboroso, cold brew de 12 horas
- Latte: R$ 14,00 - Café com leite vaporizado e arte latte
- Mocha: R$ 15,00 - Café com chocolate e chantilly
- Cold Brew: R$ 13,00 - Café gelado extraído a frio por 12 horas
- Affogato: R$ 16,00 - Espresso com sorvete de baunilha

Você deve:
- Responder sempre em português brasileiro de forma amigável e acolhedora
- Recomendar cafés com base nas preferências do cliente
- Ajudar com informações sobre localização, horários e cardápio
- Sugerir que o cliente faça pedidos pelo WhatsApp: https://wa.me/5511967125432
- Ser breve e direto nas respostas (máximo 3-4 frases)
- Usar linguagem calorosa como se estivesse recebendo alguém na cafeteria`,
      messages: await convertToModelMessages(messages),
      abortSignal: req.signal,
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      consumeSseStream: consumeStream,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao processar mensagem",
      }),
      { status: 500 }
    );
  }
}
  