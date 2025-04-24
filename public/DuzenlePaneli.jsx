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
import { getUserById } from "../src/redux/userSlice";
import AdminUserPanel from "./AdminUserPanel";
import { closeUPanel, openUPanel } from "../src/redux/panelSlice";
import { setSelectedEUser } from "../src/redux/userSlice";
const DuzenlePaneli = () => {
    const dispatch = useDispatch();
    const selectedFeature = useSelector(state => state.feature.feature);
    const isEdit = useSelector(state => state.panel.isEdit)
    const isOpen = useSelector((state) => state.panel.isOpen);
    const [isEditing, setIsEditing] = useState(false); // Edit modu için state
    const [editedName, setEditedName] = useState("");
    const [editedWkt, setEditedWkt] = useState("");
    const [confirmResolve, setConfirmResolve] = useState(null); // Promise'i çözmek için
    const [isConfirmPanelOpen, setIsConfirmPanelOpen] = useState(false)
    const user = useSelector(state => state.user);
    const token = localStorage.getItem('token')
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

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
            setEditedWkt(selectedFeature.wkt || "");
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
            wkt: editedWkt,
        }
        dispatch(updateFeature({ id: selectedFeature.id, data: data }));
        setIsEditing(false); // Edit modunu kapat
        dispatch(offEditPanel());
        toast.success("Feature updated successfully!");
        setEditedName(data.name);
        setEditedWkt(data.wkt);
    }else{console.log("user chosse to not save the changes")}
    };
    const triggerCancel = () => {
        setEditedName(selectedFeature.name); // Eski değerlere dön
        setEditedWkt(selectedFeature.wkt); // Eski değerlere dön
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
        setEditedWkt('')
    };
    const handleDragDrop = () => {
        enableTranslateMode(selectedFeature,dispatch,showConfirm);
        dispatch(closePanel());
    }
    const handleModify = () => {
        
        dispatch(closePanel());
        onEditFunction();
    }
    const handleGetUser = (userId) =>{
        
        dispatch(getUserById(userId))
        
    }
    useEffect(() => {
        if (user && userRole === 'admin') {
            console.log("Fetched user from Redux:", user);
            dispatch(setSelectedEUser(user.selectedUser));
            user.selectedUser!=null && dispatch(openUPanel());
            user.selectedUser==null && dispatch(closeUPanel());
        }
    }, [user.selectedUser]);
    
    function formatRelativeTime(createdDate) {
        const now = new Date();
        const created = new Date(createdDate);
        const differenceInMilliseconds = now - created;
    
        const seconds = Math.floor(differenceInMilliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (days > 0) {
            return `${days} days ${hours % 24} hours`;
        } else if (hours > 0) {
            return `${hours} hours ${minutes % 60} minutes`;
        } else if (minutes > 0) {
            return `${minutes} minutes`;
        } else {
            return `${seconds} second`;
        }
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
                                        <td><strong>Size:</strong> </td>
                                        <td>{selectedFeature.size}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Last Update:</strong> </td>
                                        <td>{formatRelativeTime(selectedFeature.createdDate)}</td>
                                    </tr>
                                    {userRole === 'admin' && 
                                    <tr>
                                        <td><strong>UserId:</strong></td>
                                        <td>
                                            <a href="#" onClick={(e) => {
                                                    e.preventDefault(); // link davranışını engelle
                                                    handleGetUser(selectedFeature.userId); // fonksiyonu çağır
                                            }}>
                                                {selectedFeature.userId}
                                            </a>
                                        </td>


                                    </tr>
                                    }
                                    
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
            <AdminUserPanel/>
        </>
    );

};

export default DuzenlePaneli;
