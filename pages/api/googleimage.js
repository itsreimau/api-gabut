import {
    googleImage
} from "@bochilteam/scraper";

const creator = "@itsreimau";

export default async function handler(req, res) {
    const {
        search
    } = req.query;

    try {
        if (!search) throw new Error("Parameter 'search' is required");

        const result = await googleImage(search);

        const json = {
            status: true,
            creator: creator,
            result
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