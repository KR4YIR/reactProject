import { getMap } from "../initMap";
import { updateFeature } from "../redux/objectSlice";
import { vectorSource } from "../initMap";
import { Modify } from "ol/interaction";
const enableDragMode = (selectedFeature,dispatch) =>{
    const map = getMap();
    const modify = new Modify({source: vectorSource });
    
    modify.on('modifyend', (event) => {
        const feature = event.features.item(0);
        const newCoords = feature.getGeometry().getCoordinates();
        console.log('Yeni konum:', newCoords);
      });
      map.addInteraction(modify);
    
}

export default enableDragMode