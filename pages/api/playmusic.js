import {
    createAPIUrl
} from "../../tools/api.js";
import fetch from "node-fetch";
import yts from "yt-search";

const creator = "@itsreimau";

export default async function handler(req, res) {
    const {
        source,
        query
    } = req.query;

    try {
        if (!source) throw new Error("Parameter 'source' is required");
        if (!query) throw new Error("Parameter 'query' is required");

        if (source === "spotify") {
            const spotifyApiUrl = createAPIUrl("sandipbaruwal", "/spotify", {
                query
            });
            const spotifyResponse = await fetch(spotifyApiUrl);
            const spotifyData = await spotifyResponse.json();
            const music = spotifyData[0];

            const downloadApiUrl = createAPIUrl("nyxs", "/down", {
                url: music.url
            });
            const downloadResponse = await fetch(downloadApiUrl);
            const downloadData = await downloadResponse.json();

            const json = {
                status: true,
                creator: creator,
                result: {
                    title: music.title,
                    artist: music.artist,
                    url: downloadData.link
                }
            };
            res.status(200).json(json);
        } else if (source === "youtube") {
            const search = await yts(query);
            const music = search.videos[0];

            const youtubeDownloadApiUrl = createAPIUrl("nyxs", "/dl/yt", {
                url: music.url
            });
            const youtubeDownloadResponse = await fetch(youtubeDownloadApiUrl);
            const youtubeDownloadData = await youtubeDownloadResponse.json();

            const json = {
                status: true,
                creator: creator,
                result: {
                    title: music.title,
                    artist: music.author.name,
                    url: youtubeDownloadData.result.data.mp3.url
                }
            };
            res.status(200).json(json);
        } else {
            throw new Error("Invalid source parameter");
        }
    } catch (error) {
        const json = {
            status: false,
            creator: creator,
            error: error.message
        };
        res.status(400).json(json);
    }
}