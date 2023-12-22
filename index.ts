import express, { Express } from "express";
import cookieParser from "cookie-parser";
import router from "./routes/imageGeneratorRouter";
import cors from "cors";
import { healthCheck } from "./controllers/healthCheck";
import dotenv from "dotenv";
dotenv.config();
const app: Express = express();
app.use(cors())

app.use(express.json());
app.use(cookieParser())
app.use("/api/v1/", router)
app.get("/", healthCheck);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ():void => {
  console.log(`Server is running at port ${PORT}`);
});
