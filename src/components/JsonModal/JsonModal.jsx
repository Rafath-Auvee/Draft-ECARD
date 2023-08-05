import React, { useState } from "react";
import Toast from "@/components/Toast/Toast";

const JsonModal = ({ visible, onClose, formData }) => {
  const [showToast, setShowToast] = useState(false);

  const handleCopyToClipboard = () => {
    // Convert the JSON data to a formatted string
    const jsonString = JSON.stringify(formData, null, 2);

    // Create a new text area element and set its value to the JSON string
    const textarea = document.createElement("textarea");
    textarea.value = jsonString;
    textarea.style.position = "fixed"; // Make it invisible
    document.body.appendChild(textarea);

    // Select and copy the text in the text area to clipboard
    textarea.select();
    document.execCommand("copy");

    // Remove the text area element from the DOM
    document.body.removeChild(textarea);

    // Show "Copy done" toast
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    visible && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
        {showToast && (
          <Toast
            message={"Copy Done"}
            onClose={handleToastClose}
            type={"success"}
          />
        )}
        <div className="bg-white p-4 rounded shadow-md max-w-lg">
          <pre>{JSON.stringify(formData, null, 2)}</pre>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCopyToClipboard}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Copy to Clipboard
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default JsonModal;
