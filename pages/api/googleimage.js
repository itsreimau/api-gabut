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

        const shuffledResult = shuffle(result);

        const json = {
            status: true,
            creator: creator,
            result: shuffledResult
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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}