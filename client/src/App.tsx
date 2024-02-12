import { useCallback, useEffect, useMemo, useState } from "react";
import { Header, PostEditor } from "./components";
import { PostData, UserData } from "./types";
import { PostItem } from "./components/Post";
import { toMap } from "./common/objects";
import SpinnerWrapper from "./components/SpinnerWrapper/SpinnerWrapper";
import DeletePostDialog from "./components/DeletePostDialog/DeletePostDialog";

const getUserById = (
  userId: number,
  usersMap: Map<number, UserData>
): UserData => {
  const user = usersMap.get(userId);
  if (!user) throw new Error("User not found");
  return user;
};

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const [switchUserOptions, setSwitchUserOptions] = useState<UserData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);

  const openEditor = () => setIsPostEditorOpen(true);

  const onUserAvatarClicked = () => {
    const index = Math.floor(Math.random() * switchUserOptions.length);
    const user = switchUserOptions[index];
    setLoggedInUser(user);
    if (switchUserOptions.length === 1) setSwitchUserOptions(users);
    else setSwitchUserOptions((uo) => uo.filter((u) => u.id !== user.id));
  };

  const getUsers = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();
    setUsers(users);
    setSwitchUserOptions(users.slice(1));
    setLoggedInUser(users[0]);
    setIsLoading(false);
  }, []);

  const getPosts = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch("http://localhost:3000/posts");
    const posts = await res.json();
    setPosts(posts);
    setIsLoading(false);
  }, []);

  const updatePost = useCallback(
    async (post: PostData | (Omit<PostData, "id"> & { id: null })) => {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/post", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const posts = await res.json();
      setPosts(posts);
      setIsLoading(false);
    },
    []
  );

  const createPost = useCallback(
    async (post: PostData | (Omit<PostData, "id"> & { id: null })) => {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const posts = await res.json();
      setPosts(posts);
      setIsLoading(false);
    },
    []
  );
  const deletePost = useCallback(async (id: number) => {
    setIsLoading(true);
    const res = await fetch(`http://localhost:3000/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const posts = await res.json();
    setPosts(posts);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getUsers();
    getPosts();
  }, []);

  const usersMap = useMemo(
    () =>
      toMap(
        users,
        (u) => u.id,
        (a) => a
      ),
    [users]
  );

  return (
    <>
      <Header
        openPostEditor={openEditor}
        onUserAvatarClicked={onUserAvatarClicked}
        loggedInUser={loggedInUser ?? { id: 0, name: "" }}
        setIsPostEditorOpen={() => setIsPostEditorOpen(true)}
      />
      <SpinnerWrapper loading={isLoading}>
        <div className="posts-wrapper">
          {posts.map((p) => (
            <PostItem
              post={p}
              author={getUserById(p.userId, usersMap)}
              onEditButtonClicked={(p) => {
                setSelectedPost(p);
                setIsPostEditorOpen(true);
              }}
              onDeleteButtonClicked={(postId) => setDeletePostId(postId)}
              currentUserId={loggedInUser ? loggedInUser.id : -1}
              key={`post-${p.id}`}
              updatePost={updatePost}
              getUserById={(id) => getUserById(id, usersMap)}
            />
          ))}
        </div>
        {loggedInUser && (
          <PostEditor
            open={isPostEditorOpen}
            onClose={() => {
              setSelectedPost(null);
              setIsPostEditorOpen(false);
            }}
            onSubmit={selectedPost ? updatePost : createPost}
            postData={selectedPost}
            currentUserId={loggedInUser.id}
          />
        )}
        <DeletePostDialog
          open={deletePostId !== null}
          handleClose={() => setDeletePostId(null)}
          onDeletePost={async (id) => {
            await deletePost(id);
            setDeletePostId(null);
          }}
          postId={deletePostId}
        />
      </SpinnerWrapper>
    </>
  );
}

export default App;
