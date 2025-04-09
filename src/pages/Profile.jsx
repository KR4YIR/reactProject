import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./profile.css"
import { logout } from "../redux/authSlice";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        // Eğer giriş yapılmamışsa login sayfasına yönlendir
        if (!isAuthenticated) {
            navigate("/signIn");
        } else if (!user) {
            // Giriş yapılmış ama kullanıcı bilgisi yoksa getir
            dispatch(getMe());
        }
    }, [dispatch, isAuthenticated, user, navigate]);

    if (!user) {
        return <p>Yükleniyor...</p>; // kullanıcı bilgisi gelene kadar loading gösterebilirsin
    }
    const handleHome =() =>{
        console.log("home")
        navigate('/')
    }
    const handleLogOut =() =>{
        console.log("logout")
        dispatch(logout());
    }
    return (
        <div className="background2">
            <div className="profile-container">
                <h1>Profile</h1>
                <table className="profile-table-container">
                    <tbody>
                        <tr><td>Name</td><td>{user.name}</td></tr>
                        <tr><td>Surname</td><td>{user.surname}</td></tr>
                        <tr><td>Username</td><td>{user.username}</td></tr>
                        <tr><td>Email</td><td>{user.email}</td></tr>
                    </tbody>
                </table>
                <div className="profile-buttons">
                    <button onClick={handleHome}>BackToHome</button>
                    <button onClick={handleLogOut}>LogOut</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
