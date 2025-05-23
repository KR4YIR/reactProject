import { Route, Routes } from "react-router-dom";
import NotFoundPage from './pages/NotFoundPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Map from "./Map";
import PrivateRoute from "./utils/PrivateRoute";
import Profile2 from "./pages/Profile2";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  
  
  return(
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute><Map/></PrivateRoute>}/>
        <Route path="/signIn" element={<SignIn/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        {/* <Route path="/profile" element={<Profile/>}/> */}
        <Route path="/profile" element={<PrivateRoute><Profile2/></PrivateRoute>}/>
        <Route path="/ChangePassword" element={<PrivateRoute><ChangePassword/></PrivateRoute>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
}

export default App;
