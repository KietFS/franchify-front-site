import OverlayLoading from "@/components/organisms/OverlayLoading";
import React from "react";

interface IAppLoadingProvider {}

const AppLoadingProvider: React.FC<IAppLoadingProvider> = (props: any) => {
  return (
    <>
      {props.children}
      <OverlayLoading />;
    </>
  );
};

export default AppLoadingProvider;
