import Replicate from "replicate";
import dotenv from "dotenv";
dotenv.config();

const configReplicate = () => {
  let replicate;
  try {
    replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
    return replicate;
  } catch (error) {
    console.log(error);
  }
  return replicate;
};

export { configReplicate };
