import express, { Express } from "express";
import { Request, Response } from "express";
import router from "./routes/imageGeneratorRouter";
import cors from "cors";
import { healthCheck } from "./controllers/healthCheck";
import dotenv from "dotenv";
dotenv.config();
const app: Express = express();
app.use(cors())

app.use(express.json());

app.use("/api/v1/", router)
app.get("/", healthCheck);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ():void => {
  console.log("Server is running at port 3000");
});
