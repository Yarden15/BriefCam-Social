import { FunctionComponent } from "react";
import { PostData } from "../../types";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { UserAvatar } from "..";
import { Delete, Edit, ThumbUp } from "@mui/icons-material";

export const PostItem: FunctionComponent<{ post: PostData }> = ({ post }) => {
  return (
    <Card sx={{ maxWidth: 600, margin: "1em auto 0 auto" }}>
      <CardHeader
        avatar={
          <UserAvatar
            user={{
              id: 0,
              name: "Baster Baxter",
              avatar:
                "https://static.wikia.nocookie.net/arthur/images/6/65/Buster_Baxter.png",
            }}
          />
        }
        title="Baster Baxter"
        subheader={post.date}
      />
      {post.imageUrl && <CardMedia component="img" image={post.imageUrl} />}
      <CardContent>{post.content}</CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <Edit />
        </IconButton>
        <IconButton>
          <Delete />
        </IconButton>
        <IconButton sx={{ marginLeft: "auto" }}>
          <ThumbUp />
        </IconButton>
      </CardActions>
    </Card>
  );
};
