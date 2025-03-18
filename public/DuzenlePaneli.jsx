import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { clearFeature } from "../src/redux/featureSlice";
import { deleteFeature, updateFeature } from "../src/redux/objectSlice";
import { closePanel } from "../src/redux/panelSlice";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const DuzenlePaneli = () => {
    const dispatch = useDispatch();
    const selectedFeature = useSelector(state => state.feature.feature);
    const isEdit = useSelector(state => state.feature.isEditOn)
    console.log(isEdit)
    
    const isOpen = useSelector((state) => state.panel.isOpen);
    const [isEditing, setIsEditing] = useState(false); // Edit modu için state
    const [editedName, setEditedName] = useState("");
    const [editedWkt, setEditedWkt] = useState("");
    

    
    // selectedFeature değiştiğinde state'i güncelle
    useEffect(() => {
        if (selectedFeature) {
            setEditedName(selectedFeature.name || "");
            setEditedWkt(selectedFeature.wkt || "");
            setIsEditing(isEdit);
        }
    }, [selectedFeature]);
    

    const triggerEdit = () => {
        setIsEditing(true); // Edit modunu aktif et
    };

    const triggerSave = () => {
        const data = {
            name: editedName,
            wkt: editedWkt
        }
        console.log(editedWkt)
        dispatch(updateFeature({ id: selectedFeature.id, data: data }));
        setIsEditing(false); // Edit modunu kapat
        toast.success("Feature updated successfully!");
    };

    const triggerCancel = () => {
        setEditedName(selectedFeature.name); // Eski değerlere dön
        setEditedWkt(selectedFeature.wkt);
        setIsEditing(false); // Edit modunu kapat
        
    };

    const triggerDelete = () => {
        if (confirm("Do you want to delete feature???")) {
            dispatch(deleteFeature(selectedFeature.id));
            dispatch(clearFeature());
            dispatch(closePanel());
            toast.success("Feature deleted successfully!");
        } else {
            toast.warning("Delete operation is cancelled!");
        }
    };

    const handleClose = () => {
        dispatch(clearFeature());
        dispatch(closePanel());
        setEditedName('')
        setEditedWkt('')
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            {selectedFeature && (
                <>
                    <div>
                        <table className="table-container">
                            <tbody>
                                <tr>
                                    <td><strong>ID:</strong> </td>
                                    <td>{selectedFeature.id}</td>
                                </tr>
                                <tr>
                                    <td><strong>Name:</strong> </td>
                                    <td style={{padding:"0px 12px"}}>
                                        {isEditing ? (
                                            <input 
                                                type="text"
                                                value={editedName}
                                                onChange={(e) => setEditedName(e.target.value)}
                                            />
                                        ) : (
                                            editedName
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>wkt:</strong> </td>
                                    <td style={{padding:"0px 12px"}}>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedWkt}
                                                onChange={(e) => setEditedWkt(e.target.value)}
                                            />
                                        ) : (
                                            editedWkt
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Created Date:</strong> </td>
                                    <td>{selectedFeature.createdDate}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            <div className="edit-butonlari">
                {isEditing ? (
                    <>
                        <button onClick={triggerSave} className="save-btn">Save</button>
                        <button onClick={triggerCancel} className="delete-btn">Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={triggerEdit} disabled={!selectedFeature} className="save-btn">Edit</button>
                        <button onClick={triggerDelete} disabled={!selectedFeature} className="delete-btn">Delete</button>
                        <button onClick={handleClose} className="close-btn">Close</button>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default DuzenlePaneli;
