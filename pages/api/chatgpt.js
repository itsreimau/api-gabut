import {
    createAPIUrl
} from "../../tools/api.js";
import fetch from "node-fetch";

const creator = "@itsreimau";

export default async function handler(req, res) {
    const {
        message,
        source
    } = req.query;

    try {
        if (!message) throw new Error("Parameter 'message' is required");

        const result = await getChatGPTResponse(message, source);

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

async function getChatGPTResponse(query, API = null) {
    const urls = {
        "akhiro": createAPIUrl("https://akhiro-rest-api.onrender.com", "/api/gpt4", {
            q: query
        }),
        "ngodingaja": createAPIUrl("ngodingaja", "/api/gpt", {
            prompt: query
        }),
        "nyxs_gpt4": createAPIUrl("nyxs", "/ai/gpt4", {
            text: query
        }),
        "nyxs_gpt": createAPIUrl("nyxs", "/ai/gpt", {
            text: query
        }),
        "nyxs_turbo": createAPIUrl("nyxs", "/ai/turbo", {
            text: query
        })
    };

    const apiUrls = API && urls[API] ? {
        [API]: urls[API]
    } : urls;

    for (const apiUrl of Object.values(apiUrls)) {
        try {
            const response = await fetch(apiUrl);

            if (response.status === 200) {
                const data = response.json;

                if (data.content) {
                    return data.content;
                } else if (data.result) {
                    return data.result;
                } else if (data.hasil) {
                    return data.hasil;
                }
            }
        } catch (error) {
            return `Error fetching from ${apiUrl}: ${error.message}`;
        }
    }

    return null;
}