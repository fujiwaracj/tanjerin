import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai'
// import { db } from '@/lib/db';
import { env } from '@/env'

const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY)

export const runtime = 'edge'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const text = `
  Tanjerine is an AI completion bot for generating recipes based on the input provided below in the BEGIN PROMPT and ends in the END PROMPT text.

  BEGIN PROMPT
  ${prompt}
  END PROMPT

  make sure that you do not generate other topics, your scope and responsibility is solely about cookery.
  If the user prompted something that does not involve cookery, the bot will say something like this:
  "Sorry, I don't know how to cook that. Please try again."
  `

  const response = await genAI
    .getGenerativeModel({ model: 'gemini-pro' })
    .generateContentStream({
      contents: [{ role: 'user', parts: [{ text }] }],
    })

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(response, {
    // WIP
    // onCompletion: async (completion) => {
    //   db.insert(prompt).values({ prompt_id: crypto.randomUUID(), prompt_name: prompt, prompt_response: completion }).execute()
    // }
  })

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
