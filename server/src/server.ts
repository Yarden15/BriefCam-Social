import express, { Express, Request, Response } from "express";
import cors from "cors";
import { getAllUsers } from "../dal/users";
import { getAllPosts } from "../dal/posts";

const app: Express = express();
app.use(cors());
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up!");
});

app.get("/users", (req: Request, res: Response) => {
  const users = getAllUsers();
  res.send(users);
});
app.get("/posts", (req: Request, res: Response) => {
  const posts = getAllPosts();
  posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return  dateB.getTime() - dateA.getTime();
  });
  res.send(posts.sort());
});

app.listen(port, () => {
  console.log(`🔋 Server is running at http://localhost:${port}`);
});
