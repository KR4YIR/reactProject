import { Route, Routes } from "react-router-dom";
import NotFoundPage from './pages/NotFoundPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Map from "./Map";
function App() {
  
  
  return(
    <>
       
      <Routes>
        <Route path="/" element={<Map/>}/>
        <Route path="/signIn" element={<SignIn/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
}

export default App;
