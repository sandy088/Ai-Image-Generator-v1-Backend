import Replicate from "replicate";
import dotenv from "dotenv";
dotenv.config();

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

async function upscaleImg(prompt: string) {
    try {
        const output = await replicate.run(
            `${process.env.PREDICTION_MODEL_OWNER}/${process.env.PREDICTION_MODEL_MIDDLE}:${process.env.PREDICTION_MODEL_ID}`,
            {
                input: {
                    prompt: prompt,
                }
            }
        );
        console.log(output)
        return output;
    } catch (error) {
        console.log(error);
        return { error: error};
    }
}

export default upscaleImg;
