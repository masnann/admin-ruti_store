import React, { useState, useEffect } from "react";

const Alert = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return isVisible ? (
    <div
      className={`fixed top-5 right-5 md:right-5 lg:right-10 p-4 rounded-md ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    >
      <div className="flex justify-between">
        <p>{message}</p>
        <button onClick={onClose} className="text-white ml-2">
          &#x2715;
        </button>
      </div>
    </div>
  ) : null;
};

const CustomAlert = ({ alerts, setAlerts }) => {
  const handleClose = (index) => {
    setAlerts((prevAlerts) => prevAlerts.filter((_, i) => i !== index));
  };

  return (
    <>
      {alerts.map((alert, index) => (
        <Alert
          key={index}
          message={alert.message}
          type={alert.type}
          onClose={() => handleClose(index)}
        />
      ))}
    </>
  );
};

export default CustomAlert;
