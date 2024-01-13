import { configReplicate } from "../../config/replicateConfig";

const replicate = configReplicate();

async function englishToHinglish(prompt: string) {
  try {
    const output = await replicate?.run(
      `${"nateraw"}/${"axolotl-llama-2-7b-english-to-hinglish"}:${"03c8cc6582309c28ec5fdea84c94f49085fb105a1137f4771525376a88d8d95f"}`,
      {
        input: {
          top_k: 50,
          top_p: 0.95,
          prompt: prompt,
          do_sample: true,
          temperature: 0.9,
          max_new_tokens: 512,
          prompt_template:
            "### System:\nBelow is an instruction that describes a task. Write a response that appropriately completes the request.\n\n### Instruction:\nTranslate the input from English to Hinglish\n\n### Input:\n{prompt}\n\n### Response:\n",
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

export { englishToHinglish };
