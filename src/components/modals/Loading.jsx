// src/components/LoadingModal.jsx
import React from "react";

const LoadingModal = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="text-white">Loading...</div>
    </div>
  );
};

export default LoadingModal;
