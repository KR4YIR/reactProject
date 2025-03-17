// PopUp.js
import React from "react";
import "./PopUp.css"; // Create a stylesheet for styling

const PopUp = ({ isOpen, title, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <h2>{title}</h2>
                <p>{message}</p>
                <button className="close-btn" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default PopUp;
