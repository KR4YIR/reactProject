import { useEffect, useState } from "react";
import Header from "./Header";
import InitMap from "./initMap";
import displayObj from "./displayObj";
import { useDispatch, useSelector } from "react-redux";
import { getAllObjects } from "./redux/objectSlice";
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmPanel from "../public/ConfirmPanel";
import { StopEditButton } from "./StopEditButton";
import { setSum,setLine,setPoint,setPolygon } from "./redux/countSlice";
const Map = () => {
  const [isConfirmPanelOpen, setIsConfirmPanelOpen] = useState(false);
  const dispatch = useDispatch();
  const { objects } = useSelector(state => state.object);
  // Fetch objects on component mount
  useEffect(() => {
    
    dispatch(getAllObjects());
    
    
  }, [dispatch]);
  
  // Call displayObj whenever objects change
  useEffect(() => {
    if (objects && objects.length > 0) {
      displayObj(objects);
      
      if (objects.length > 0) {
        let pointCount = 0;
        let lineCount = 0;
        let polygonCount = 0;
    
        objects.forEach(obj => {
          if (obj.wkt.startsWith("POINT")) {
            pointCount++;
          } else if (obj.wkt.startsWith("LINESTRING")) {
            lineCount++;
          } else if (obj.wkt.startsWith("POLYGON")) {
            polygonCount++;
          }
        });
        dispatch(setPoint(pointCount));
        dispatch(setLine(lineCount));
        dispatch(setPolygon(polygonCount));
        dispatch(setSum(objects.length));
    }
    }
  }, [objects]);
  return(
    <>
        <ToastContainer position="top-right" autoClose={1000} />
        <Header />
        <StopEditButton/>
        <InitMap/>
        <ConfirmPanel
            isOpen={isConfirmPanelOpen}
            onClose={() => setIsConfirmPanelOpen(false)} 
        />
    </>
  )
}
export default Map;