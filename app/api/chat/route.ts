import { env } from "@/env";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import { db } from "@/lib/db";
// import { prompt } from "@/lib/db/schema";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";

export const runtime = 'edge';

const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);

const buildGoogleGenAIPrompt = (messages: Message[]) => ({
    contents: messages
        .filter(message => message.role === 'user' || message.role === 'assistant')
        .map(message => ({
            role: message.role === 'user' ? 'user' : 'model',
            parts: [{ text: message.content }],
        })),
});

export async function POST(req: Request) {
    const { messages } = await req.json();
    // const lastMessage = messages[messages.length - 1];
    const response = await genAI.getGenerativeModel({ model: 'gemini-pro' })
        .generateContentStream(buildGoogleGenAIPrompt(messages))
    // const crypto = new Crypto();
    const stream = GoogleGenerativeAIStream(response, {
        // WIP
        // onStart: async () => {
        //     await db.insert(prompt).values({
        //         promptId: crypto.randomUUID(),
        //         promptResponse: lastMessage.content,
        //         role: 'user',
        //     })
        // },
        // onCompletion: async (completion) => {
        //     await db.insert(prompt).values({
        //         promptId: crypto.randomUUID(),
        //         promptResponse: completion,
        //         role: 'system'
        //     })
        // }
    })

    return new StreamingTextResponse(stream)
}
