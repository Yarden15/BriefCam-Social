import { FunctionComponent } from "react";
import { PostData, UserData } from "../../types";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
} from "@mui/material";
import { UserAvatar } from "..";
import { Delete, Edit, ThumbUp } from "@mui/icons-material";
import { formatDate } from "../../common/datetime";
import styled from "styled-components";

const LikesCounter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: -1em;
  margin-right: 6px;

  .circle {
    color: white;
    background: #1976d2;
    padding: 0.15em 0.45em;
    border-radius: 100%;
    font-size: 12px;
  }
`;

export const PostItem: FunctionComponent<{
  post: PostData;
  author: UserData;
  currentUserId: number;
  onEditButtonClicked: (p: PostData | null) => void;
  onDeleteButtonClicked: (postId: number) => void;
  updatePost: (p: PostData) => Promise<void>;
  getUserById: (id: number) => UserData;
}> = ({
  post,
  author,
  currentUserId,
  onEditButtonClicked,
  onDeleteButtonClicked,
  updatePost,
  getUserById,
}) => {
  return (
    <Card sx={{ maxWidth: 600, margin: "1em auto 0 auto" }}>
      <CardHeader
        avatar={<UserAvatar user={author} />}
        title={author.name}
        subheader={formatDate(post.date)}
      />
      {post.imageUrl && <CardMedia component="img" image={post.imageUrl} />}
      <CardContent>{post.content}</CardContent>
      <LikesCounter>
        {post.likes.length > 0 && (
          <div className="circle">{post.likes.length}</div>
        )}
      </LikesCounter>

      <CardActions disableSpacing>
        {currentUserId === author.id && (
          <IconButton onClick={() => onEditButtonClicked(post)}>
            <Edit />
          </IconButton>
        )}
        {currentUserId === author.id && (
          <IconButton onClick={() => onDeleteButtonClicked(post.id)}>
            <Delete />
          </IconButton>
        )}
        <Tooltip
          disableHoverListener={post.likes.length < 1}
          title={
            <div>
              {post.likes.map((l) => (
                <div>{getUserById(l).name}</div>
              ))}
            </div>
          }
        >
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={() => {
              updatePost({
                ...post,
                likes: post.likes.some((l) => l === currentUserId)
                  ? post.likes.filter((id) => currentUserId !== id)
                  : [...post.likes, currentUserId],
              });
            }}
          >
            <ThumbUp
              color={
                post.likes.some((id) => id === currentUserId)
                  ? "primary"
                  : "action"
              }
            />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};
