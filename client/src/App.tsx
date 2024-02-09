import { useState } from "react";
import { Header } from "./components";
import { PostData, UserData } from "./types";

function App() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);

  const openEditor = () => setIsPostEditorOpen(true);

  return (
    <>
      <Header openPostEditor={openEditor} />
      <div className="posts-wrapper"></div>
    </>
  );
}

export default App;
