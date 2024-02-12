import express from "express";
import { getAllPosts, updatePosts } from "../dal/posts";

const router = express.Router();

router.get("/posts", (req, res) => {
  const posts = getAllPosts();
  posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  res.send(posts.sort());
});

router.put("/post", async (req, res) => {
  const post = req.body;
  const posts = getAllPosts();
  const postIndex = posts.findIndex((p) => post.id === p.id);
  if (postIndex === -1) {
    throw new Error("post not found");
  }
  posts[postIndex] = post;
  updatePosts(posts);
  posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  res.send(posts);
});

router.post("/post", async (req, res) => {
  const post = req.body;
  const posts = getAllPosts();
  posts.push({ ...post, id: generateId() });
  updatePosts(posts);
  posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  res.send(posts);
});

router.delete("/post/:id", async (req, res) => {
  const posts = getAllPosts().filter((p) => p.id !== parseInt(req.params.id));
  updatePosts(posts);
  posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  res.send(posts);
});

function generateId(): number {
  return Math.floor(Math.random() * 9000) + 1000;
}

export default router;
