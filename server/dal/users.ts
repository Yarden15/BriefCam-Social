import { DBUser } from "./types";
import { readJsonFromFile } from "./utils";

export const getAllUsers = (): DBUser[] => {
  const users: DBUser[] = readJsonFromFile(__dirname + "/../db/users.json");
  return users;
};
