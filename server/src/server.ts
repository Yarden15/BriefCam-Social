import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
app.use(cors());
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up!");
});

app.listen(port, () => {
  console.log(`🔋 Server is running at http://localhost:${port}`);
});
