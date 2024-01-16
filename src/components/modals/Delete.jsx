// DeleteConfirmationModal.jsx
import React from "react";

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-md">
          <p className="text-xl font-bold mb-4">Are you sure you want to delete this article?</p>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteConfirmationModal;
