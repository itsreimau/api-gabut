import {
    jadwalsholat
} from "@bochilteam/scraper";

const creator = "@itsreimau";

export default async function handler(req, res) {
    try {
        const query = req.query.query;
        if (!query) {
            throw new Error("Parameter 'query' is required");
        }

        const data = await jadwalsholat(query);
        const json = {
            status: true,
            creator: creator,
            result: {
                region: query.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase()),
                schedule: data
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