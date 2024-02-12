import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import "./styles.css";
import { PostData } from "../../types";
import { useEffect, useState } from "react";

type PostEditorProps = {
  open: boolean;
  postData: PostData | null;
  currentUserId: number;
  onClose: () => void;
  onSubmit: (
    post: PostData | (Omit<PostData, "id"> & { id: null })
  ) => Promise<void>;
};

export const PostEditor: React.FC<PostEditorProps> = ({
  open,
  onClose,
  postData,
  onSubmit,
  currentUserId,
}) => {
  useEffect(() => {
    if (postData) {
      setContent(postData.content);
      setImageUrl(postData.imageUrl ?? "");
    }
  }, [postData]);

  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const handleClose = () => {
    setContent("");
    setImageUrl("");
    onClose();
  };
  return (
    <Dialog open={open} onClose={() => handleClose()} fullWidth maxWidth="md">
      <DialogTitle>Post Editor</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{
            marginTop: "1em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Content"
            multiline
            fullWidth
            minRows={4}
            maxRows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Box>
        <Box
          noValidate
          component="form"
          sx={{
            marginTop: "1em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Image url"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button
          type="submit"
          onClick={async () => {
            await onSubmit({
              content,
              imageUrl: imageUrl === "" ? undefined : imageUrl,
              date: new Date().toISOString(),
              id: postData ? postData.id : null,
              userId: currentUserId,
              likes: postData ? postData.likes : [],
            });
            handleClose();
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
