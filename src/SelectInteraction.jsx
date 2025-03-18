import DuzenlePaneli from '../public/duzenlePaneli';
import SelectInteraction from 'ol/interaction/Select';
import { setFeature } from './redux/featureSlice';
import { openPanel, closePanel } from './redux/panelSlice';
function Select(map,dispatch) {
  
    
  // Create OpenLayers select interaction
  const select = new SelectInteraction();
  map.addInteraction(select);
  
  // Listen for selection events
  select.on('select', (e) => {
    if (e.selected.length > 0) {
      const selectedFeature = e.selected[0];
      
      // Get the feature data
      const pointData = selectedFeature.get('pointData');
      
      if (pointData) {
        // Show panel with the feature data
        console.log(pointData)
        dispatch(setFeature(pointData))
        dispatch(openPanel());
      }
    } else {
      // Hide panel when no features are selected
      
    }
  });
  
  // Clear selection when panel is closed
    //select.getFeatures().clear();
    
  
  
  return (
    //select,
    <>
    <DuzenlePaneli/>
    </>
  );
}

export default Select;