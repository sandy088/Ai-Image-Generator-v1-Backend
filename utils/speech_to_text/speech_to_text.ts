import Replicate from "replicate";
import dotenv from "dotenv";
dotenv.config();

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

async function generateSpeechToText(audioString: string) {
    try {
        const output = await replicate.run(
            `${'nvlabs'}/${'parakeet-rnnt-1.1b'}:${'73ddbebaef172a47c8dfdd79381f110bfdc7691bcc7a4edde82f0a39e380ce50'}`,
            {
                input: {
                    audio_file: audioString
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

export { generateSpeechToText };