import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-t-blue-500 border-gray-300"></div>
    </div>
  );
};

export default Loading;
