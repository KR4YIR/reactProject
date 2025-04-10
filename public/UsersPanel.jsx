import { useState, useEffect, useRef } from 'react';
import './QueryPanel.css';
import { useSelector, useDispatch } from "react-redux";
import { getAllUser } from '../src/redux/userSlice';

const UsersPanel = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUser());
      }, [dispatch]);
      
    const { objects } = useSelector(state => state.object);
   
    const user = useSelector(state => state.user.Users);
      
    console.log(user.value);
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
    const handleEdit = (id) => {
   
    };
    const handleDelete = (id) => {
        console.log(id)

    };
    
    // Find the feature and zoom to it
    const handleShow = (id) => {
        
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
                                    <th>Email</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                            {user.value?.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name} {item.surname}</td>
                                    <td>{item.email}</td>
                                    <td>
                                         <button 
                                            className="edit-btn"
                                            onClick={() => handleShow(item.id)}
                                        >
                                            Show
                                        </button>
                                        
                                        <button
                                            className="save-btn"
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
    </>    
    );
};

export default UsersPanel;
