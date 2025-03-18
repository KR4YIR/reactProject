import { useState, useEffect, useRef } from 'react';
import './QueryPanel.css';
import { useSelector,useDispatch } from "react-redux";
import zoomToFeature from '../src/utils/zoomToFeature';
import { getMap } from '../src/initMap';
import { deleteFeature } from '../src/redux/objectSlice';
import { toast } from 'react-toastify'; // Bildirimi içe aktarın
import { openPanel, closePanel } from '../src/redux/panelSlice';
import DuzenlePaneli from './duzenlePaneli';
import { setFeature } from '../src/redux/featureSlice';
//import { zoomToFeature } from '../src/zoomToFeature';
const QueryPanel = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { objects } = useSelector(state => state.object);
    const [animationClass, setAnimationClass] = useState('');
    const panelRef = useRef(null);
    

   
    
    
    useEffect(() => {
        if (isOpen) {
            setAnimationClass('panel-open');
            document.body.style.overflow = 'hidden';
        } else {
            setAnimationClass('panel-close');
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (panelRef.current && !panelRef.current.contains(event.target) && isOpen) {
    //             onClose();
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [isOpen, onClose]);

    if (!isOpen && animationClass !== 'panel-open') return null;


    
    const handleEdit = (id) => {
        console.log(`Düzenleniyor: ${id}`);
        const feature = objects.find(obj => obj.id === id);
        if (feature) {
            // Show panel with the feature data
            
            //setIsDuzenlePaneliOpen(true)
            dispatch(setFeature(feature))
            dispatch(openPanel())
            //onClose();

        }
    };

    const handleDelete = (id) => {
        console.log(`Siliniyor: ${id}`);
        if (confirm("Do you want to delete feature???")) {
            dispatch(deleteFeature(id));
            toast.success("Feature deleted successfully!");
        }else{
            toast.warning("delete operation is cancelled!");
        }
    };
    
    // Find the feature and zoom to it
    const handleShow = (id) => {
        console.log(`Zooming to feature with ID: ${id}`);
        const map = getMap(); // Get the map instance
        const feature = objects.find(obj => obj.id === id);
        
        if (feature && map) {
            console.log('Map and feature found, zooming...');
            zoomToFeature(map, feature);
            toast.success("Zooming: "+feature.name);

        } else {
            console.warn('Feature or map not found. Map:', map, 'Feature:', feature);
        }
        onClose();
    };
    return (
    <>
        <div className={`query-panel-overlay ${animationClass}`}>
            <div
                className={`query-panel-container ${animationClass}`}
                ref={panelRef}
            >
                <div className="query-panel-header">
                    <h2>Nokta Listesi</h2>
                    <button className="query-panel-close-btn" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="query-panel-body">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>WKT</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {objects?.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.wkt}</td>
                                        <td>
                                            <button 
                                                className="edit-btn"
                                                onClick={() => handleShow(item.id)}
                                            >
                                                Show
                                            </button>
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(item.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </div>
        <DuzenlePaneli
        //     isOpen={isOpen} // Derived from Redux or parent state
        //     onClose={() => {
        //         dispatch(closePanel()); // Close panel safely via Redux
        // }}
        />
    </>    
    );
};

export default QueryPanel;
