import { DBPost, DBUser } from "./types";
import { readJsonFromFile } from "./utils";

export const getAllPosts = (): DBPost[] => {
  const posts: DBPost[] = readJsonFromFile(__dirname + "/../db/posts.json");
  return posts;
};
