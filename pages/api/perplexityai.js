import PerplexityAI from "perplexityai";

const creator = "@itsreimau";

export default async function handler(req, res) {
    try {
        const query = req.query.prompt;
        if (!prompt) {
            throw new Error("Parameter 'prompt' is required");
        }

        const response = await PerplexityAI.search(prompt);

        const json = {
            status: true,
            creator: creator,
            result: response
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