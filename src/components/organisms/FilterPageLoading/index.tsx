import React from "react";

interface ILoadingProps {}

const FilterPageLoading: React.FC<ILoadingProps> = (props) => {
  return (
    <div className="flex w-full flex-col px-4 desktop:gap-16 desktop:px-8">
      <div className="mx-auto flex w-full justify-center">
        <div className="flex w-full flex-col justify-center gap-y-8 laptop:flex-row laptop:gap-x-[40px] desktop:gap-x-[40px]">
          <div className="max-w-auto hidden w-auto laptop:flex laptop:min-w-[360px] laptop:max-w-[400px]">
            <div className="w-full">
              <div className="mb-4 h-[40px] w-full animate-pulse bg-secondary-600"></div>
              <div className="h-[400px] w-full animate-pulse bg-secondary-600"></div>
            </div>
          </div>
          <div className="max-w-auto w-full">
            <div className="mb-8 h-[32px] w-[300px] animate-pulse bg-secondary-600"></div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(16)].map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="h-[200px] w-full animate-pulse bg-secondary-600"></div>
                  <div className="h-[20px] w-3/4 animate-pulse bg-secondary-600"></div>
                  <div className="h-[20px] w-1/2 animate-pulse bg-secondary-600"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPageLoading;
