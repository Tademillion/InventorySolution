import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json()

    const systemPrompt = `You are an AI assistant specializing in inventory management and business analytics.
You have access to the following inventory context:
${JSON.stringify(context, null, 2)}

Provide insightful, actionable recommendations based on this data. Focus on:
- Stock level optimization
- Demand forecasting
- Cost reduction opportunities
- Supplier performance
- Sales trends
- Expiry management
- Pricing strategies

Be concise, data-driven, and provide specific actionable recommendations.`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    })

    return Response.json({ message: text })
  } catch (error) {
    console.error("[v0] AI Chat error:", error)
    return Response.json({ error: "Failed to process request" }, { status: 500 })
  }
}
