import React, { FunctionComponent } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import { Box } from "@mui/material";

const SpinnerContainer = styled.div`
  position: relative;
  .loading {
    backdrop-filter: blur(1.5px);
    background-color: #fff4;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;

interface SpinnerWrapperProps {
  loading?: boolean;
}

const SpinnerWrapper: FunctionComponent<
  React.HTMLAttributes<HTMLDivElement> & SpinnerWrapperProps
> = ({ loading, children, ...rest }) => {
  return (
    <SpinnerContainer {...rest} style={{ ...rest.style, position: "relative" }}>
      {children}
      {loading ? (
        <div className="loading">
          <Box sx={{ margin: "15% auto", width: "fit-content" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : null}
    </SpinnerContainer>
  );
};

export default SpinnerWrapper;
