import express, { Express, Request, Response } from "express";
import cors from "cors";
import apiRouter from "../api";

const app: Express = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up!");
});

app.use(apiRouter);

app.listen(port, () => {
  console.log(`🔋 Server is running at http://localhost:${port}`);
});
