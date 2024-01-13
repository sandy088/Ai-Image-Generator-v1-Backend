import Replicate from "replicate";
import dotenv from "dotenv";
dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function generateImageToVideo(prompt: string, imageUrl: string) {
  try {
    const output = await replicate.run(
      `${"ali-vilab"}/${"i2vgen-xl"}:${"5821a338d00033abaaba89080a17eb8783d9a17ed710a6b4246a18e0900ccad4"}`,
      {
        input: {
          image: imageUrl,
          prompt: prompt,
          max_frames: 16,
          guidance_scale: 9,
          num_inference_steps: 50,
        },
      }
    );
    console.log(output);
    return output;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export { generateImageToVideo};
