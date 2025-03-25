"use client";

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

interface IOverlayLoading {}

const OverlayLoading: React.FC<IOverlayLoading> = (props) => {
  const { isGlobalLoading } = useSelector((state: any) => state.common);

  return (
    <>
      {isGlobalLoading ? (
        <div>
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={isGlobalLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : null}
    </>
  );
};

export default OverlayLoading;
