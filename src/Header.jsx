import {useState } from 'react';
import '../style/Header.css';
import AddPointPanel from '../public/AddPointPanel';
import QueryPanel from '../public/QueryPanel';
import enableDrawMode from './utils/enableDrawMode';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from './redux/authSlice';
import { useNavigate } from 'react-router-dom';
import UsersPanel from '../public/UsersPanel';
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isQueryPanelOpen, setIsQueryPanelOpen] = useState(false);
  const [isUsersPanelOpen, setIsUsersPanelOpen] = useState(false);
  const [isAddPointPanelOpen, setIsAddPointPanelOpen] = useState(false);
  const visibility = useSelector(state => state.Edit.edit)
  const token = localStorage.getItem('token')
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  console.log(userRole);
 
  return (
    !visibility && (
    <header>
      <div className='Header'>
        <h1>Türkiye Haritası</h1>
        <div className='button'>
        <>
        <button onClick={() => enableDrawMode('Point', dispatch, setIsAddPointPanelOpen)}>Add Point</button>
        <button onClick={() => enableDrawMode('LineString', dispatch, setIsAddPointPanelOpen)}>Add Linestring</button>
        <button onClick={() => enableDrawMode('Polygon', dispatch, setIsAddPointPanelOpen)}>Add Polygon</button>
        <button onClick={() => setIsQueryPanelOpen(true)}>Query Panel</button>
        <button onClick={() => navigate('/Profile')}>Profile</button>
        {/* {userRole === 'user' && <button onClick={() => navigate('/Profile')}>Profile</button>} */}
        {userRole === 'admin' && <button className='admin-panel' onClick={() => setIsUsersPanelOpen(true)}>Admin Panel</button>}
        <button onClick={() => dispatch(logout())}>LogOut</button>

        
        
        </>
        
        </div>
      </div>

      {/* Form Paneli */}
      <AddPointPanel
        isOpen={isAddPointPanelOpen} 
        onClose={() => setIsAddPointPanelOpen(false)}
        title="Add Feature"
        position="right"
      />

      {/* Tablo Paneli */}
      <QueryPanel 
        isOpen={isQueryPanelOpen} 
        onClose={() => setIsQueryPanelOpen(false)}
      />
      <UsersPanel 
        isOpen={isUsersPanelOpen} 
        onClose={() => setIsUsersPanelOpen(false)} 
      />
    </header>
  ));
}

export default Header;