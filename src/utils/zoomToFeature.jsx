import { WKT } from 'ol/format';

const zoomToFeature = (map, feature) => {
    if (!map || !feature) {
        console.warn('Map or feature is undefined');
        return;
    }
    
    try {
        console.log('Zooming to feature:', feature);
        // Create a WKT format reader
        const wktFormat = new WKT();
        
        // Read the geometry from the WKT string
        const geometry = wktFormat.readGeometry(feature.wkt, {
            dataProjection: 'EPSG:4326',
            featureProjection: map.getView().getProjection()
        });
        
        // Get the extent of the geometry
        const extent = geometry.getExtent();
        
        //console.log('Feature extent:', extent);
        
        // Fit the view to the extent
        map.getView().fit(extent, {
            padding: [50, 50, 50, 50],
            maxZoom: 10,
            duration: 1000
        });
    } catch (error) {
        console.error('Error parsing WKT or zooming to feature:', error);
        console.error('WKT string:', feature.wkt);
    }
};
export default zoomToFeature