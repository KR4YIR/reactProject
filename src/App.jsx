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
function App() {
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
    }
  }, [objects]);
  
  return(
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <StopEditButton/>
      <InitMap/>
      <ConfirmPanel
        isOpen={isConfirmPanelOpen}
        onClose={() => setIsConfirmPanelOpen(false)} 
      /> 
    </>
  );
}

export default App;
