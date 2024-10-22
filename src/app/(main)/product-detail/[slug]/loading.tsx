import React from "react";

interface ILoadingProps {}

const Loading: React.FC<ILoadingProps> = (props) => {
  return (
    <div style={{ height: "1200px", width: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          padding: "80px 0",
          columnGap: "80px",
        }}
      >
        <div
          className="animate-pulse bg-gray-100 mt-20 pt-20"
          style={{ width: 480, height: 480 }}
        ></div>
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "40px" }}
        >
          <div
            className="animate-pulse bg-gray-100 mt-20 pt-20"
            style={{ width: 600, height: 80 }}
          ></div>

          <div
            className="animate-pulse bg-gray-100 mt-20 pt-20"
            style={{ width: 400, height: 30 }}
          ></div>

          <div
            className="animate-pulse bg-gray-100 mt-20 pt-20"
            style={{ width: 400, height: 60 }}
          ></div>

          <div
            className="animate-pulse bg-gray-100 mt-20 pt-20"
            style={{ width: 600, height: 120 }}
          ></div>
        </div>
      </div>

      <div>
        <div
          className="animate-pulse bg-gray-100 mt-20"
          style={{ width: 1200, height: 40 }}
        ></div>
        <div style={{ display: "flex", columnGap: "40px", marginTop: 40 }}>
          <div
            className="animate-pulse bg-gray-100 mt-20 pt-20"
            style={{ width: 280, height: 280 }}
          ></div>
          <div
            className="animate-pulse bg-gray-100 mt-20 pt-20"
            style={{ width: 280, height: 280 }}
          ></div>
          <div
            className="animate-pulse bg-gray-100 mt-20 pt-20"
            style={{ width: 280, height: 280 }}
          ></div>
          <div
            className="animate-pulse bg-gray-100 mt-20 pt-20"
            style={{ width: 280, height: 280 }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
