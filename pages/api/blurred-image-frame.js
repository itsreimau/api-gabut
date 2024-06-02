// https://github.com/vascabarkapa/blurred-image-frame

import {
    createCanvas,
    loadImage
} from 'canvas';

const creator = "@itsreimau";

export default async function handler(req, res) {
    const imageUrl = req.query.url;

    if (!imageUrl) {
        throw new Error("Parameter 'url' is required");
    }

    try {
        const image = await loadImage(imageUrl);

        const canvasWidth = 1280;
        const canvasHeight = 720;

        const canvas = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext('2d');

        const aspectRatio = canvasWidth / canvasHeight;
        const imageAspectRatio = image.width / image.height;
        let newWidth, newHeight;
        if (imageAspectRatio > aspectRatio) {
            newWidth = canvasWidth;
            newHeight = canvasWidth / imageAspectRatio;
        } else {
            newWidth = canvasHeight * imageAspectRatio;
            newHeight = canvasHeight;
        }

        const xOffset = (canvasWidth - newWidth) / 2;
        const yOffset = (canvasHeight - newHeight) / 2;
        ctx.filter = 'blur(50px)';
        ctx.drawImage(image, -100, -100, canvasWidth + 200, canvasHeight + 200);
        ctx.filter = 'none';
        ctx.drawImage(image, xOffset, yOffset, newWidth, newHeight);

        const buffer = canvas.toBuffer();
        res.setHeader('Content-Type', 'image/jpeg');
        res.status(200).send(buffer);
    } catch (error) {
        const json = {
            status: false,
            creator: creator,
            error: error.message
        };

        res.status(400).json(json);
    }
}