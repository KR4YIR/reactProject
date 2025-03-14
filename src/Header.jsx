import { useState } from 'react';
import '../style/Header.css';
import AddPointPanel from '../public/AddPointPanel';
import QueryPanel from '../public/queryPanel';
import enableDrawMode from './utils/enableDrawMode';
import { useDispatch } from 'react-redux';
function Header() {
  const dispatch = useDispatch();

  const [isQueryPanelOpen, setIsQueryPanelOpen] = useState(false);
  const [isAddPointPanelOpen, setIsAddPointPanelOpen] = useState(false);

  return (
    <header>
      <div className='Header'>
        <h1>Türkiye Haritası</h1>
        <div className='button'>
        <button onClick={() => enableDrawMode('Point', dispatch, setIsAddPointPanelOpen)}>Add Point</button>
        <button onClick={() => enableDrawMode('LineString', dispatch, setIsAddPointPanelOpen)}>Add Linestring</button>
        <button onClick={() => enableDrawMode('Polygon', dispatch, setIsAddPointPanelOpen)}>Add Polygon</button>
          <button onClick={() => setIsQueryPanelOpen(true)}>Tablo Göster</button>
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
    </header>
  );
}

export default Header;