import React from "react";
import "./Modal.css"; // Stil için ayrı bir dosya kullanabilirsiniz

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="carpi-buton">
        <button onClick={onClose} >X</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
