import React from "react";

const FilterLayout = ({ children }: any) => {
    return (
        <div className="flex w-full justify-center">
            <div className="py-16 bg-white desktop:max-w-[1560px] laptop:max-w-[960px] w-full mx-auto min-h-[800px]">
                {children}
            </div>
        </div>
    );
};

export default FilterLayout;
