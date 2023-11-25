import { Request, Response } from "express";
import upscaleImg from "../utils/ImageGenerationUtils/imageGenerate";

import dotenv from "dotenv";
dotenv.config();
const generateImage = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        
        const token = req.headers.authorization?.split(" ")[1];

        //validations
        if (!prompt || prompt === "") {
            return res.status(400).json({
                message: "Prompt is required"
            })

        }

        if (!token || token !== process.env.API_TOKEN) {
            return res.status(401).json({
                message: "Invalid Token"
            })
        }

        const output: { error?: string } = await upscaleImg(prompt);

        if (output.error) {
            return res.status(500).json({
                message: "Error in generating image",
                error: output.error
            });
        }

        return res.status(200).json({
            message: "Image generated",
            output: output
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error in generating image",
            error: error
        });
    }
}

export default [generateImage]

