// Select.js
import SelectInteraction from 'ol/interaction/Select';
import DetailsPanel from '../public/DetailsPanel';

function Select(map) {
  // Create details panel instance
  const detailsPanel = new DetailsPanel();
  
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
        detailsPanel.show(pointData, 'Selected Feature Details', {
          feature: selectedFeature,
          map: map
        });
      }
    } else {
      // Hide panel when no features are selected
      detailsPanel.hide();
    }
  });
  
  // Clear selection when panel is closed
  const originalHideMethod = detailsPanel.hide;
  detailsPanel.hide = function() {
    originalHideMethod.call(this);
    select.getFeatures().clear();
    return this;
  };
  
  return select;
}

export default Select;