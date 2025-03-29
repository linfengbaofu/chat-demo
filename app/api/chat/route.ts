import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Configure OpenRouter provider
  const openrouter = createOpenAI({
    baseURL: "https://openrouter.ai/api/v1", // OpenRouter API endpoint
    apiKey: "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", // Your OpenRouter API key
    // defaultHeaders: {
    //   "HTTP-Referer": "YOUR_SITE_URL", // Optional: Replace with your site URL
    //   "X-Title": "YOUR_APP_NAME", // Optional: Replace with your app name
    // },
  });

  const result = await streamText({
    model: openrouter("openai/gpt-3.5-turbo"), // Use OpenRouter's model
    system:
      "Do not respond with markdown or lists. Keep responses brief. Ask the user to upload images/documents if it helps understand the problem better.",
    messages,
  });

  return result.toDataStreamResponse();
}



// apiKey: "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", // Your OpenRouter API key
