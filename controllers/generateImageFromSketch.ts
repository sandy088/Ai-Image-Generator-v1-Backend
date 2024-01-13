import { Request, Response } from "express";
import dotenv from "dotenv";
import { verifyKey } from "@unkey/api";
import { generateImageFromSketch } from "../utils/image_editing/generate_image_from_sketch";
dotenv.config();

const genImageFromSketch = async (req: Request, res: Response) => {
  try {
    const { prompt, imageUrl, negativePrompt } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    const tokenExp =
      req.headers["tokenexp"] || req.cookies.tokenExp || "expiryToken";
    console.log(req.headers);

    if (!tokenExp || tokenExp === "expiryToken") {
      console.log(tokenExp);
      return res.status(401).json({
        message: "Token Not Found",
      });
    }
    //validations
    const { result, error } = await verifyKey(tokenExp);

    if (!result?.valid) {
      console.log("In Not valid function");
      return res.status(401).json({
        success: false,
        message:
          "unauthorized or your limit exceeded (Purchase a plan to increase your limit)",
      });
    }
    if (error) {
      console.log("In error function");
      return res.status(401).json({
        success: false,
        error: error,
      });
    }

    if (!prompt || prompt === "") {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }
    if (!imageUrl || imageUrl === "") {
      return res.status(400).json({
        message: "Image-url is required",
      });
    }

    if (!token || token !== process.env.API_TOKEN) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    const output: { error?: string } | undefined = await generateImageFromSketch(
      prompt,
      imageUrl,
      negativePrompt
    );

    if (output?.error || !output) {
      return res.status(500).json({
        message: "Error in generating image",
        error: output?.error,
      });
    }

    return res.status(200).json({
      message: "Image generated",
      output: output,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in generating image",
      error: error,
    });
  }
};

export { genImageFromSketch };
