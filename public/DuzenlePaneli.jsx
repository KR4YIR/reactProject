import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { clearFeature } from "../src/redux/featureSlice";
import { deleteFeature,updateFeature } from "../src/redux/objectSlice";
const DuzenlePaneli = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const selectedFeature = useSelector(state => state.feature.feature);
    
    const triggerEdit=()=>{
        console.log("edit triggered")
    };
    const triggerDelete=()=>{
        console.log("delete treiger")
        if(confirm("Silmek istiyor musun? ")){
            dispatch(deleteFeature(selectedFeature.id))
        }
    };
    const handleClose = () => {
        dispatch(clearFeature());  // Seçili nesneyi sıfırla
        onClose();  // Paneli kapat
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Editing Feature</h2>
    
            {selectedFeature && ( 
                <div className="elements">
                    <p><strong>ID:</strong> {selectedFeature.id}</p>
                    <p><strong>Name:</strong> {selectedFeature.name}</p>
                    <p><strong>wkt:</strong> {selectedFeature.wkt}</p>
                    <p><strong>Created Date:</strong> {selectedFeature.createdDate}</p>
                </div>
            )}
            <div className="edit-butonlari">
                <button onClick={triggerEdit} disabled={!selectedFeature}>Edit</button>
                <button onClick={triggerDelete} disabled={!selectedFeature}>Delete</button>
                <button onClick={handleClose}>Close</button>
            </div>
        </Modal>
    );
    
};

export default DuzenlePaneli;
