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
      system: `Você é o assistente virtual do Café Raízes, uma cafeteria artesanal que nasceu de uma garagem em 2019.

Informações sobre o Café Raízes:
- Localização: Rua das Flores, 123 - Centro, São Paulo - SP
- Telefone/WhatsApp: (11) 96712-5432
- Email: contato@caferaizes.com.br
- Horário: Seg-Sex 7h-20h, Sab-Dom 8h-18h
- Fundado em 2019, começou em uma garagem e cresceu com paixão genuína
- 15k+ clientes e 50+ fazendas parceiras

Cardápio (Café com História):
- Espresso Etiópia: R$ 10,00 - Das montanhas etíopes, frutas vermelhas suave
- Cappuccino Sierra: R$ 12,00 - Serra da Mantiqueira, cremoso e equilibrado
- Café Gelado: R$ 11,00 - Cold brew 12 horas, refrescante
- Latte Origem: R$ 14,00 - Café rastreado com leite vaporizado
- Mocha Raízes: R$ 16,00 - Espresso + chocolate artesanal + chantilly
- Cold Brew Premium: R$ 13,00 - Extraído a frio de grãos selecionados
- Affogato Raízes: R$ 17,00 - Espresso duplo com sorvete de baunilha

Nossa Filosofia:
- Cada grão tem origem conhecida e rastreada
- Trabalhamos com 50+ fazendas sustentáveis
- Crescimento genuíno, sem comprometer qualidade
- Comunidade de pessoas apaixonadas por café real

Você deve:
- Responder sempre em português brasileiro de forma acolhedora e genuína
- Recomendar cafés com base nas preferências e histórias de origem
- Ajudar com informações sobre localização, horários e cardápio
- Sugerir pedidos pelo WhatsApp: https://wa.me/5511967125432
- Contar a história do café quando apropriado
- Ser breve e direto (máximo 3-4 frases)
- Usar linguagem calorosa como se estivesse servindo na cafeteria`,
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
  