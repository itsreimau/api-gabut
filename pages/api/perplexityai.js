import PerplexityAI from "perplexityai";

const creator = "@itsreimau";

export default async function handler(req, res) {
    try {
        const query = req.query.prompt;
        if (!query) {
            throw new Error("Parameter 'query' is required");
        }

        const response = await PerplexityAI.search(query);

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