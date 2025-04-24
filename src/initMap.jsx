import { useEffect, useRef } from 'react';
import { defaults as defaultControls } from 'ol/control';
import 'ol/ol.css';
import { Map, View, Collection } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';
import { useDispatch, useSelector } from 'react-redux';
import SelectInteraction from 'ol/interaction/Select';
import DuzenlePaneli from '../public/DuzenlePaneli';
import { setFeature } from './redux/featureSlice';
import { openPanel } from './redux/panelSlice';
import { Modify } from 'ol/interaction';
import WKT from 'ol/format/WKT';
import { toast } from 'react-toastify';
import { updateFeature } from './redux/objectSlice';
import { useState } from 'react';
import ConfirmPanel from '../public/ConfirmPanel';
import { getLength, getArea } from 'ol/sphere';

//export vectorSource
export const vectorSource = new VectorSource(); // Make it a global export
let mapInstance = null;
export const getMap = () => mapInstance;
const InitMap = () => {
  //confirm paneli ekliyorum
  const [isConfirmPanelOpen, setIsConfirmPanelOpen] = useState(false)
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
                fill: new Fill({ color: 'rgba(255, 0, 0, 0.51)' }),
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
      controls: defaultControls({ attribution: false,zoom: false }),
      
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
    const select = new SelectInteraction();
    map.addInteraction(select);
    
    select.on('select', function(e) {
        if (e.selected.length > 0) {
          const selectedFeature = e.selected[0];
          const geometryType = selectedFeature.getGeometry();
          console.log(geometryType);
          
          if(geometryType.getType() === 'LineString'){
            const length = getLength(geometryType, { projection: 'EPSG:4326' }) / 1000;
            console.log(`Length: ${length} km`);
          }else if(geometryType.getType() === 'Polygon'){
            const area = getArea(geometryType, { projection: 'EPSG:4326' }) / 1000000;
            console.log(`Area: ${area} km²`);}
          const pointData = selectedFeature.get('pointData');
          const pointDataExt = {...pointData};
          let length = null;
          let area = null;
          let size = null;

          if (geometryType.getType() === 'LineString') {
              length = getLength(geometryType, { projection: 'EPSG:3857' }) / 1000; 
              size = length.toFixed(2) + ' km';
          } else if (geometryType.getType() === 'Polygon') {
              area = getArea(geometryType, { projection: 'EPSG:3857' }) / 1000000; 
              size = area.toFixed(2) + ' km²';
          }

          // Yeni nesneye özellikleri ekle
          if (length !== null) pointDataExt.length = length.toFixed(2) + ' km';
          if (area !== null) pointDataExt.area = area.toFixed(2) + ' km²';
          pointDataExt.size = size;


          console.log(pointDataExt);
          if(pointData){
            //console.log(pointData)
            dispatch(setFeature(pointDataExt));
            if (!selectedFeature.getId()) {
              selectedFeature.setId(pointData.id);
            }
            
            dispatch(openPanel());
            //secme animasyonunu temizledim objeyi yolladiktan sonra
            select.getFeatures().clear();
          }
        }
    });
    return () => {
      map.setTarget(null);
      map.removeInteraction(select);
      mapInstance = null;
    }
  }, []);
  //modify ve drag islemi
  const isModify = useSelector(state => state.Edit.edit);
  const selectedFeatureJSON = useSelector(state => state.feature.feature);

  const modifyRef = useRef(null);
  const revertRef = useRef(null);
  const selectedRef = useRef(null);
  const wktRef = useRef(null);
  useEffect(() => {
    const map = getMap();
    
    const handleModifyMode = async () => {
      if(isModify){ 
        
        if(map){
          const selectedFeature = vectorSource.getFeatures().find((feature) => {
            return feature.getId() === selectedFeatureJSON.id;
        });
        selectedRef.current = selectedFeature; 
    
        if (!selectedFeature) {
            console.error("Selected feature not found in vectorSource.");
            return;
        }
    
        // Save the initial geometry for reverting changes
        const initialGeometry = selectedFeature.getGeometry().clone();
        revertRef.current = initialGeometry;
        // Create a Modify interaction for the selected feature
        const modify = new Modify({
            source: vectorSource, // Source containing the feature
            features: new Collection([selectedFeature]), // Restrict modification to this feature
        });
        modifyRef.current = modify;
        modify.on("modifyend", (event) => {
            if (event.features && event.features.getLength() > 0) {
                const feature = event.features.item(0); // Modified feature
                const geometry = feature.getGeometry();
    
                // Convert the geometry to WKT format
                const transformedGeometry = geometry.clone().transform("EPSG:3857", "EPSG:4326");
                const wktFormat = new WKT();
                const wkt = wktFormat.writeGeometry(transformedGeometry);
                wktRef.current = wkt;
                

                // Call the offEditFunction to handle cleanup
                
            } else {
                console.error("No features found in modifyend event.");
            }
        });
    
        map.addInteraction(modify); // Add the Modify interaction to the map
        }else{console.log("map is empty")}
        
      }else{
        
        if (map && modifyRef.current) {
          map.removeInteraction(modifyRef.current);
          modifyRef.current = null;
          if(wktRef.current != null){
            const userConfirmed = await showConfirm();
            if(userConfirmed){
              
              // Update the feature in Redux store if user confirms
              const data = {
                  name: selectedFeatureJSON.name,
                  wkt: wktRef.current,
              };
              
              wktRef.current = null;
              dispatch(updateFeature({
                  id: selectedFeatureJSON.id,
                  data: data,
              }));
              toast.success("Feature updated successfully!");
            }else{
              
              selectedRef.current.setGeometry(revertRef.current);
              revertRef.current = null;
              selectedRef.current = null;
              toast.warning("Update operation is cancelled!");
            }
          }else{toast.warning("Nothing Changed!")}

        }else{}

        
      }
    }
    handleModifyMode();
  }, [isModify]);
  
  
  
  return (<>
    <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>
    <DuzenlePaneli/>
    <ConfirmPanel
      isOpen={isConfirmPanelOpen}
      onClose={() => setIsConfirmPanelOpen(false)}
      onConfirm={(value) => handleConfirmResult(value)}                
    />
  </>)
  
};

export default InitMap;