import { useState, useEffect, useRef, useCallback } from 'react';
import './AddPointPanel.css';
import { useSelector, useDispatch } from 'react-redux';
import { addFeature } from '../src/redux/objectSlice';
import { resetLastDrawnFeature,nullLastDrawnFeature } from '../src/utils/enableDrawMode';
import { toast } from 'react-toastify';
const AddPointPanel = ({ isOpen, onClose, title, position = 'right'}) => {
  const dispatch = useDispatch();
  const [animationClass, setAnimationClass] = useState('');
  const AddPointPanelRef = useRef(null);
  const [pointName, setPointName] = useState('');

  const wkt = useSelector(state => state.wkt.wktData); // Redux Store'dan WKT alınıyor
  // Handle panel open/close animation
  useEffect(() => {
    if (isOpen) {
      setAnimationClass('panel-open');
      document.body.style.overflow = 'hidden';
    } else {
      setAnimationClass('panel-close');
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handlePanelClose = () => {
    setPointName(''); // Reset local point name
    onClose(); // Execute the parent close function
    toast.warning("Feature Adding Cancelled!");
    resetLastDrawnFeature();


  };

  // Close panel on clicking outside
  const handleClickOutside = useCallback((event) => {
    if (AddPointPanelRef.current && !AddPointPanelRef.current.contains(event.target) && isOpen) {
      
      toast.warning("Feature Adding Cancelled!");
      onClose();
      resetLastDrawnFeature();


    }
  }, [isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      
    };
  }, [handleClickOutside]);

  // Handle form submission
  const handleSubmit = (event) => {
    const featureData = {
      name: pointName,
      wkt: wkt
    };
    setPointName('');
    event.preventDefault();
    // Add your save logic here
    //addpoint
    dispatch(addFeature(featureData));
    toast.success("Feature Successfully Added!");
    nullLastDrawnFeature();
    onClose();
  };

  if (!isOpen && animationClass !== 'panel-open') return null;

  return (
    <div className={`panel-overlay ${animationClass}`}>
      <div 
        className={`panel-container ${position} ${animationClass}`}
        ref={AddPointPanelRef}
        aria-labelledby="panel-title"
        aria-describedby="panel-description"
      >
        <div className="panel-header">
          <h2 id="panel-title">{title}</h2>
          <button
            className="panel-close-btn"
            onClick={handlePanelClose}
            aria-label="Close Panel"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="panel-body">
          <form className="point-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="pointName">Name:</label>
              <input
                type="text"
                id="pointName"
                name="pointName"
                value={pointName}
                onChange={(e) => setPointName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="wkt">WKT:</label>
              <input
                type="text"
                id="wkt"
                name="wkt"
                value={wkt}  // Use the value from Redux
                disabled
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">Save</button>
              <button type="button" className="cancel-btn" onClick={handlePanelClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPointPanel;
