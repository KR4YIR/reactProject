import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';
import Select from './SelectInteraction';




//export vectorSource
export const vectorSource = new VectorSource(); // Make it a global export
let mapInstance = null;
export const getMap = () => mapInstance;
const InitMap = () => {
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
    const selectInteraction = Select(map);
    
    return () => {
      map.setTarget(null);
      map.removeInteraction(selectInteraction);
      mapInstance = null;
    }
  }, []);


  
  
  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>;
};

export default InitMap;
