import React from "react";

const CreateOrderLayout = ({ children }: any) => {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-[1200px] bg-white py-16">{children}</div>
    </div>
  );
};

export default CreateOrderLayout;
