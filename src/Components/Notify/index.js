import React, { useEffect, useState } from "react";
import "./notify.css";

const NotifyComponent = ({ message, type, show }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const displayToast = () => {
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const hideToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    setToastMessage(message);
    displayToast();
    setShowToast(show);
  }, [show]);
  return (
    <>
      {showToast && (
        <div className="toast-container">
          <div
            className={
              type === "error"
                ? "dangerToast"
                : type === "warning"
                ? "warningToast"
                : "successToast"
            }
          >
            <span>{toastMessage}</span>
            <button className="close-btn" onClick={hideToast}>
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NotifyComponent;
