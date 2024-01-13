import { configReplicate } from "../../config/replicateConfig";
const replicate = configReplicate();
async function generateMusicFromPrompt(prompt: string) {
  try {
    const output = await replicate?.run(
      `${"meta"}/${"musicgen"}:${"b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38"}`,
      {
        input: {
          top_k: 250,
          top_p: 0,
          prompt: prompt,
          duration: 33,
          temperature: 1,
          continuation: false,
          model_version: "stereo-large",
          output_format: "wav",
          continuation_start: 0,
          multi_band_diffusion: false,
          normalization_strategy: "peak",
          classifier_free_guidance: 3,
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

export { generateMusicFromPrompt };
