import React from "react";
import { useSelector } from "react-redux";

const GlobalLoadingProvider = (props: { children: any }) => {
  const {} = useSelector((state: any) => state.common);
};
