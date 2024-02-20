import { configReplicate } from "../../config/replicateConfig";

const replicate = configReplicate();
async function restoreImageFace(img_url: string) {
  try {
    const output = await replicate?.run(
      `${"tencentarc"}/${"gfpgan"}:${"9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3"}`,
      {
        input: {
          img: img_url,
          scale: 2,
          version: "v1.4",
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

export { restoreImageFace };
