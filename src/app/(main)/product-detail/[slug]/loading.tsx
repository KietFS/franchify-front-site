import React from "react";

interface ILoadingProps {}

const Loading: React.FC<ILoadingProps> = (props) => {
  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 pb-20">
      <div className="flex flex-col md:flex-row py-10 gap-5">
        <div className="animate-pulse bg-secondary-600 mt-10 pt-20 w-full md:w-[480px] h-[480px]"></div>
        <div className="flex flex-col gap-5 w-full">
          <div className="animate-pulse bg-secondary-600 mt-10 pt-20 w-full h-[80px]"></div>
          <div className="animate-pulse bg-secondary-600 mt-10 pt-20 w-full h-[30px]"></div>
          <div className="animate-pulse bg-secondary-600 mt-10 pt-20 w-full h-[120px]"></div>
        </div>
      </div>

      <div>
        <div className="animate-pulse bg-secondary-600 mt-10 w-full h-[40px]"></div>
        <div className="flex flex-col md:flex-row gap-5 mt-10">
          <div className="animate-pulse bg-secondary-600 mt-10 pt-20 w-full md:w-[280px] h-[280px]"></div>
          <div className="animate-pulse bg-secondary-600 mt-10 pt-20 w-full md:w-[280px] h-[280px]"></div>
          <div className="animate-pulse bg-secondary-600 mt-10 pt-20 w-full md:w-[280px] h-[280px]"></div>
          <div className="animate-pulse bg-secondary-600 mt-10 pt-20 w-full md:w-[280px] h-[280px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
