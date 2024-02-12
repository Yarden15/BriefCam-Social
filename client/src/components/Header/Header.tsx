import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { UserData } from "../../types";
import "./styles.css";
import { UserAvatar } from "../UserAvatar";

type HeaderProps = {
  openPostEditor: () => void;
  onUserAvatarClicked: () => void;
  loggedInUser: UserData;
  setIsPostEditorOpen: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  openPostEditor,
  onUserAvatarClicked,
  loggedInUser,
}) => {
  return (
    <AppBar position="static">
      <Toolbar disableGutters className="app-toolbar">
        <Tooltip title="Switch User">
          <IconButton onClick={() => onUserAvatarClicked()}>
            <UserAvatar user={loggedInUser} className="user-avatar" />
          </IconButton>
        </Tooltip>
        <div>
          <Typography className="app-title main" variant="h6">
            BriefCam Social
          </Typography>
          <Typography className="app-title" variant="subtitle1" lineHeight={1}>
            {loggedInUser.name}
          </Typography>
        </div>
        <Tooltip title="Add Post">
          <IconButton onClick={openPostEditor}>
            <AddOutlined htmlColor="white" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
