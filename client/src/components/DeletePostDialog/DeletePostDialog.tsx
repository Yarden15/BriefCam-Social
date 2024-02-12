import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { FunctionComponent } from "react";

type DeletePostDialogProps = {
  open: boolean;
  postId: number | null;
  handleClose: () => void;
  onDeletePost: (postId: number) => Promise<void>;
};

const DeletePostDialog: FunctionComponent<DeletePostDialogProps> = ({
  open,
  handleClose,
  postId,
  onDeletePost,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Are you sure you want to delete this post?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action cannot be undone and the post will be permanently removed
          from your profile and the feeds of other users who have interacted
          with it.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            if (postId) onDeletePost(postId);
          }}
          autoFocus
        >
          Delete Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePostDialog;
