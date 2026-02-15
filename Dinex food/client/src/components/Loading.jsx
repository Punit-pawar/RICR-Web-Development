import React from "react";
import loadingGif from "../assets/loading.gif";

const Loading = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <img src={loadingGif} alt="" className="w-40 h-40" />
      </div>
    </>
  );
};

export default Loading;