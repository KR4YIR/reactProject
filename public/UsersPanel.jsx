import { useState, useEffect, useRef } from 'react';
import './QueryPanel.css';
import { useSelector, useDispatch } from "react-redux";
import { getAllUser } from '../src/redux/userSlice';
import AdminUserPanel from './AdminUserPanel';
import { openUPanel } from '../src/redux/panelSlice';
import { setSelectedEUser } from '../src/redux/userSlice';
import { deleteUser } from '../src/redux/userSlice';
import ConfirmPanel from './ConfirmPanel';
import { toast } from 'react-toastify';
const UsersPanel = ({ isOpen, onClose }) => {
    const [isConfirmPanelOpen, setIsConfirmPanelOpen] = useState(false);
    const [confirmResolve, setConfirmResolve] = useState(null); // Promise'i çözmek için

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
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const handleUserPanelOpen = () => {
        
        dispatch(openUPanel());
    };
    useEffect(() => {
        dispatch(getAllUser()).then((action) => {setUsers(action.payload.value)});
      }, [dispatch]);
      
   
    const user = useSelector(state => state.user.Users);
    console.log("state onces",user.value)
    console.log("state sonras",users)
    
    //objects yerine users listesini isteyecez backendden
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

    if (!isOpen && animationClass !== 'panel-open') return null;
    const handleEdit = (item) => {
        dispatch(setSelectedEUser(item));
        handleUserPanelOpen();

    };
    const handleDelete = async(id) => {
        const userConfirmed = await showConfirm();
        if(userConfirmed){
        
        await dispatch(deleteUser({userId:id}));
        console.log(id)
        await dispatch(getAllUser()).then((action) => {setUsers(action.payload.value); action.payload.success ? toast.success("User deleted!"):(toast.error("User not deleted!"))});
        
        }else{toast.info("User not deleted!")}
    };
    
    // Find the feature and zoom to it
    const handleShow = (item) => {
        dispatch(setSelectedEUser(item));
        console.log(item, "item")
        handleUserPanelOpen();
    };
    return (
    <>
        <div className={`query-panel-overlay ${animationClass}`}>
            <div
                className={`query-panel-container ${animationClass}`}
                ref={panelRef}
            >
                <div className="query-panel-header">
                    <h2>Users List</h2>
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
                                    <th>Email</th>
                                    <th>S/E/D</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users?.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name} {item.surname}</td>
                                    <td>{item.email}</td>
                                    <td>
                                         <button 
                                            className="edit-btn"
                                            onClick={() => handleShow(item)}
                                        >
                                            Show
                                        </button>
                                        
                                        <button
                                            className="save-btn"
                                            onClick={() => handleEdit(item)}
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
        <AdminUserPanel/>
        <ConfirmPanel
                  isOpen={isConfirmPanelOpen}
                  onClose={() => setIsConfirmPanelOpen(false)}
                  onConfirm={(value) => handleConfirmResult(value)}                
              />
    </>    
    );
};

export default UsersPanel;
