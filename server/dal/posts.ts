import { DBPost } from "./types";
import { readJsonFromFile } from "./utils";
import fs from "fs";

export const getAllPosts = (): DBPost[] => {
  const posts: DBPost[] = readJsonFromFile(__dirname + "/../db/posts.json");
  return posts;
};
export const updatePosts = (posts: DBPost[]): DBPost[] => {
  fs.writeFileSync("./db/posts.json", JSON.stringify(posts, null, 2));
  return posts;
};
