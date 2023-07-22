import React, { useState, useEffect } from "react";
import { MdCheck } from "react-icons/md"; // Import the check icon from react-icons

const Toast = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Hide the toast after 3 seconds (adjust as needed)

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`${
        visible ? "opacity-100 z-40" : "opacity-0"
      } transition-opacity duration-300 ease-in-out fixed top-6 right-6 bg-green-500 bg-opacity-75 text-white py-2 px-10 rounded shadow flex items-center`}
    >
      <MdCheck className="mr-2 text-white rounded-full  border-2 border-white" />{" "}
      {/* Right tick icon */}
      <span>{message}</span>
    </div>
  );
};

export default Toast;
