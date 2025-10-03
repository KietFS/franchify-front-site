import React from "react";

const FilterLayout = ({ children }: any) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex min-h-[800px] w-full justify-center bg-white py-16 laptop:max-w-[1200px] desktop:max-w-[1560px] desktop:py-32">
        {children}
      </div>
    </div>
  );
};

export default FilterLayout;
