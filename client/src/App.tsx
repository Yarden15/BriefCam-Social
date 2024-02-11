import { useCallback, useEffect, useState } from "react";
import { Header } from "./components";
import { PostData, UserData } from "./types";
import { PostItem } from "./components/Post";

function App() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [switchUserOptions, setSwitchUserOptions] = useState<UserData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);

  const openEditor = () => setIsPostEditorOpen(true);

  const onUserAvatarClicked = () => {
    const index = Math.floor(Math.random() * switchUserOptions.length);
    const user = switchUserOptions[index];
    setLoggedInUser(user);
    if (switchUserOptions.length === 1) setSwitchUserOptions(users);
    else setSwitchUserOptions((uo) => uo.filter((u) => u.id !== user.id));
  };

  const getUsers = useCallback(async () => {
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();
    setUsers(users);
    setSwitchUserOptions(users);
  }, []);

  const getPosts = useCallback(async () => {
    const res = await fetch("http://localhost:3000/posts");
    const posts = await res.json();
    setPosts(posts);
  }, []);

  useEffect(() => {
    getUsers();
    getPosts();
  }, []);

  return (
    <>
      <Header
        openPostEditor={openEditor}
        onUserAvatarClicked={onUserAvatarClicked}
        loggedInUser={loggedInUser ?? { id: 0, name: "" }}
      />
      <div className="posts-wrapper">
        {posts.map((p) => (
          <PostItem post={p} />
        ))}
      </div>
      <button onClick={() => console.log(loggedInUser)}>test</button>
    </>
  );
}

export default App;
