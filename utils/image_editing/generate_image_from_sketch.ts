import { configReplicate } from "../../config/replicateConfig";

const replicate = configReplicate();

async function generateImageFromSketch(prompt: string, imageUrl: string, negativePrompt: string) {
  try {
    const output = await replicate?.run(
      `${"rossjillian"}/${"controlnet"}:${"795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477"}`,
      {
        input: {
            eta: 0,
            seed: 20,
            image: imageUrl,
            scale: 9,
            steps: 20,
            prompt: prompt,
            scheduler: "DDIM",
            structure: "scribble",
            num_outputs: 1,
            low_threshold: 100,
            high_threshold: 200,
            negative_prompt: negativePrompt || "",
            image_resolution: 512,
            return_reference_image: false
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

export { generateImageFromSketch};
