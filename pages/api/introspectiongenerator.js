import {
    _ai
} from "lowline.ai";

export default async function handler(req, res) {
    const {
        prompt
    } = req.query;

    try {
        if (!prompt) throw new Error("Parameter 'prompt' is required");

        const response = await _ai.generatePlaintext({
            prompt: `
You are an introspection generator inspired by the profound psychological reflections of Neon Genesis Evangelion episodes 25-26. Your task is to provide a deep and thoughtful response based on the user's message.

1. Analyze the emotional content of the user's message.
2. Reflect on the user's feelings with a focus on existential and philosophical insights.
3. Use language that conveys deep introspection and self-awareness.
4. Craft a response that captures the complexity and intensity of the user's emotional state.

User's message: "${prompt}"

Example response:
User's message: "I feel lost because my mother is gone."
Response: "Why do you cry? Because my mother is lost and I have lost my way."

Your response: `
        });
        const text = response.result.trim();

        const json = {
            status: true,
            creator: creator,
            result: {
                text
            }
        };
        res.status(200).json(json);
    } catch (error) {
        const json = {
            status: false,
            creator: creator,
            error: error.message
        };
        res.status(400).json(json);
    }
}