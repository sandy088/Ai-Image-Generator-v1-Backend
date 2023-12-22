import Replicate from "replicate";
import dotenv from "dotenv";
dotenv.config();

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

const noOfImagesToGenerate = process.env.NO_OF_IMAGES_TO_GENERATE || '1';
const noOfImages = parseInt(noOfImagesToGenerate);
async function upscaleImg(prompt: string) {
    try {
        const output = await replicate.run(
            `${process.env.PREDICTION_MODEL_OWNER}/${process.env.PREDICTION_MODEL_MIDDLE}:${process.env.PREDICTION_MODEL_ID}`,
            {
                input: {
                    prompt: prompt,
                    num_outputs: noOfImages, //In case you want to generate more than one image
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
