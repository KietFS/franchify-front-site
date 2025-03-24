import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

interface IOverlayLoading {
  isLoading: boolean;
}

const OverlayLoading: React.FC<IOverlayLoading> = (props) => {
  return (
    <>
      {props.isLoading ? (
        <div>
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={props.isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : null}
    </>
  );
};

export default OverlayLoading;
