import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';
import { useDispatch } from 'react-redux';
import SelectInteraction from 'ol/interaction/Select';
import DuzenlePaneli from '../public/duzenlePaneli';
import { setFeature } from './redux/featureSlice';
import { openPanel } from './redux/panelSlice';
//export vectorSource
export const vectorSource = new VectorSource(); // Make it a global export
let mapInstance = null;
export const getMap = () => mapInstance;
const InitMap = () => {
  const dispatch = useDispatch();

  const mapRef = useRef(null);

  useEffect(() => {
  

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        const geometryType = feature.getGeometry().getType();
        switch (geometryType) {
          case 'Point':
            return new Style({
              image: new CircleStyle({
                radius: 6,
                fill: new Fill({ color: 'rgba(255, 0, 0, 0.8)' }),
                stroke: new Stroke({ color: 'white', width: 2 })
              }),
            });
          case 'LineString':
            return new Style({
              stroke: new Stroke({ color: 'blue', width: 2 }),
            });
          case 'Polygon':
            return new Style({
              stroke: new Stroke({ color: 'green', width: 2 }),
              fill: new Fill({ color: 'rgba(0, 255, 0, 0.1)' }),
            });
          default:
            return null;
        }
      },

    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer, // Add the vector layer to the map
      ],
      view: new View({
        center: fromLonLat([35.2433, 38.9208]),
        zoom: 6,
      }),
    });
    mapInstance = map;
    //select islemi

    //const selectInteraction = Select(map,dispatch);
    const select = new SelectInteraction();
    map.addInteraction(select);
    
    select.on('select', function(e) {
        if (e.selected.length > 0) {
          const selectedFeature = e.selected[0];
          const pointData = selectedFeature.get('pointData');
          if(pointData){
            dispatch(setFeature(pointData));
            dispatch(openPanel());
          }
          
            
        }
    });


    return () => {
      map.setTarget(null);
      map.removeInteraction(select);
      mapInstance = null;
    }
  }, []);


  
  
  return (<>
    <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>
    <DuzenlePaneli
        //     isOpen={isOpen} // Derived from Redux or parent state
        //     onClose={() => {
        //         dispatch(closePanel()); // Close panel safely via Redux
        // }}
        />
  </>)
  
};

export default InitMap;
