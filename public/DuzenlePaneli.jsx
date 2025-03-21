import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { clearFeature } from "../src/redux/featureSlice";
import { deleteFeature, updateFeature } from "../src/redux/objectSlice";
import { closePanel } from "../src/redux/panelSlice";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { offEditPanel } from "../src/redux/panelSlice";
import ConfirmPanel from "./ConfirmPanel";
import { onEdit } from "../src/redux/editSlice";
import { enableTranslateMode } from "../src/utils/enableDragMode";

const DuzenlePaneli = () => {
    const dispatch = useDispatch();
    const selectedFeature = useSelector(state => state.feature.feature);
    const isEdit = useSelector(state => state.panel.isEdit)
    const isOpen = useSelector((state) => state.panel.isOpen);
    const [isEditing, setIsEditing] = useState(false); // Edit modu için state
    const [editedName, setEditedName] = useState("");
    const [confirmResolve, setConfirmResolve] = useState(null); // Promise'i çözmek için
    const [isConfirmPanelOpen, setIsConfirmPanelOpen] = useState(false)
    
    const showConfirm = () => {
        return new Promise((resolve) => {
            setConfirmResolve(() => resolve);
            setIsConfirmPanelOpen(true);
        });
    };
    const handleConfirmResult = (result) => {
        if (confirmResolve) {
            confirmResolve(result); // Promise'i çöz
            setConfirmResolve(null); // Temizle
        }
        setIsConfirmPanelOpen(false);
    };

    //onEdit
    const onEditFunction = () =>{
        dispatch(onEdit());
    }
    //offEdit
    
    // selectedFeature değiştiğinde state'i güncelle
    useEffect(() => {
        if (selectedFeature) {
            setEditedName(selectedFeature.name || "");
            if(isEdit){
                setIsEditing(isEdit);
                dispatch(offEditPanel());
            }
        }
    }, [selectedFeature]); 
    const triggerEdit = () => {
        setIsEditing(true); // Edit modunu aktif et
    };
    const  triggerSave = async() => {
        const userConfirmed = await showConfirm();
        
        if(userConfirmed){
        const data = {
            name: editedName,
            wkt: selectedFeature.wkt
        }
        dispatch(updateFeature({ id: selectedFeature.id, data: data }));
        setIsEditing(false); // Edit modunu kapat
        dispatch(offEditPanel());
        toast.success("Feature updated successfully!");
        setEditedName(data.name);
    }else{console.log("user chosse to not save the changes")}
    };
    const triggerCancel = () => {
        setEditedName(selectedFeature.name); // Eski değerlere dön
        setIsEditing(false); // Edit modunu kapat
        toast.warning("Updating cancelled!");

    };
    const triggerDelete = async () => {
        const userConfirmed = await showConfirm();
        if (userConfirmed) {
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
    };
    const handleDragDrop = () => {
        enableTranslateMode(selectedFeature,dispatch,showConfirm);
        dispatch(closePanel());
    }
    const handleModify = () => {
        
        dispatch(closePanel());
        onEditFunction();
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose} title="Editing Feature">
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
                                        <td>{selectedFeature.wkt}</td>
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
                            <button onClick={triggerEdit} className="save-btn">Edit</button>
                            <button onClick={handleDragDrop} className="drag-btn">Drag Mode</button>
                            <button onClick={handleModify} className="modify-btn">Modify Mode</button>
                            <button onClick={triggerDelete} className="delete-btn">Delete</button>
                            <button onClick={handleClose} className="close-btn">Close</button>
                        </>
                    )}
                </div>
            </Modal>
            <ConfirmPanel
                isOpen={isConfirmPanelOpen}
                onClose={() => setIsConfirmPanelOpen(false)}
                onConfirm={(value) => handleConfirmResult(value)}                
            />
        </>
    );

};

export default DuzenlePaneli;
