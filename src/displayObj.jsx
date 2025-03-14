import { vectorSource } from "./initMap";
import { Feature } from "ol";
import WKT from "ol/format/WKT";

function displayObj(objects) {
 
  
  
  vectorSource.clear();
  objects.forEach(object => {
    const wktFormat = new WKT();
    const geometry = wktFormat.readGeometry(object.wkt, {
      dataProjection: 'EPSG:4326',     // WKT is in WGS84
      featureProjection: 'EPSG:3857'   // OpenLayers uses Web Mercator
    });
    
    if (geometry.getType() === 'Point' || geometry.getType() === 'LineString' || geometry.getType() === 'Polygon') {
      // Create feature
      const feature = new Feature({
        geometry: geometry
      });
      // Store the original point data with the feature
      feature.set('pointData', object);
      // Add feature to source
      vectorSource.addFeature(feature);
    } else {
      console.error('Unsupported geometry type:', geometry.getType());
    }
  });
  
  return 0;
}

export default displayObj;