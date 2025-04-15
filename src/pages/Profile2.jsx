import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../redux/authSlice";
import "./profile.css";
import { logout } from "../redux/authSlice";
import { updateUser } from '../redux/userSlice';
import { toast, ToastContainer} from 'react-toastify';

const Profile2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [editedSurname, setEditedSurname] = useState(user?.name || "");
  const [editedUserName, setEditedUserName] = useState(user?.username || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");
  const objectCount = useSelector(state=> state.count.sum);
  const pointCount = useSelector(state=> state.count.point);
  const lineCount = useSelector(state=> state.count.line);
  const polyCount = useSelector(state=> state.count.polygon);
  const [objectCount2, setObjectCount2] = useState(useSelector(state=> state.count.sum));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signIn");
    } else if (!user) {
      // Giriş yapılmış ama kullanıcı bilgisi yoksa getir
      dispatch(getMe());
    }
  }, [dispatch, isAuthenticated, user, navigate]);

  
  useEffect(() => {
    if (user) {
      setEditedName(user.name || "");
      setEditedSurname(user.surname || "");
      setEditedUserName(user.username || "");
      setEditedEmail(user.email || "");
    }
  }, [user]);
  // Eğer user bilgisi gelmemişse loading göster
  if (!user) {
    return <p>Yükleniyor...</p>;
  }
  
  
  console.log(editedName);

  const handleHome = () => {
    navigate('/');
  }

  const handleSave = async () => {
    console.log("handlesave");
    // API'ye istek göndererek değişiklikleri kaydedebilirsiniz.
    // Örneğin:
    const data = {
      name : editedName,
      surname : editedSurname,
      username : editedUserName,
      email : editedEmail,
    };
    await dispatch(updateUser({data: data}))
    
    // dispatch(updateUserProfile({ name: editedName, username: editedUserName, email: editedEmail }));
    await dispatch(getMe())
    setIsEditing(false);
    toast.success("Updated successfully!");

  }

  const handleCancel = () => {
    console.log("handlecancel");
    // Cancel işlemi yapılırsa state geri alınır
    setEditedName(user.name);
    setEditedSurname(user.surname);
    setEditedUserName(user.username);
    setEditedEmail(user.email);
    setIsEditing(false);
    toast.warning("Update cancelled!");

  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleLogOut = () => {
    dispatch(logout());
  }
  const token = localStorage.getItem('token');
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  console.log(userId)
  
  return (
    <div className="container">
      <div className="main-body">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" onClick={handleHome}><a>Home</a></li>
            {userRole === 'admin' && <li className="breadcrumb-item"><a>User</a></li>}
            <li className="breadcrumb-item active" aria-current="page">User Profile</li>
          </ol>
        </nav>

        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="mt-3">
                    <h4>{user.name} {user.surname}</h4>
                    <button className="btn btn-primary" onClick={handleHome}>Home</button>
                    <button className="btn btn-outline-primary" onClick={handleLogOut}>LogOut</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                {[{ label: "Name", key: "name" }, { label: "Surname", key: "surname" }, { label: "Username", key: "username" }, { label: "Email", key: "email" }].map((info, i) => (
                  <React.Fragment key={i}>
                    <div className="row mb-3 profile-row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">{info.label}</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control profile-input"
                            value={info.key === "name" ? editedName :info.key === "surname" ? editedSurname : info.key === "username" ? editedUserName : editedEmail}
                            onChange={(e) => {
                              if (info.key === "name") {
                                setEditedName(e.target.value);
                              } else if (info.key === "surname") {
                                setEditedSurname(e.target.value);
                              }else if (info.key === "username") {
                                setEditedUserName(e.target.value);
                              } else {
                                setEditedEmail(e.target.value);
                              }
                            }}
                          />
                        ) : info.label === "Email" ? (
                          <a href={`mailto:${user[info.key]}`}>{user[info.key]}</a>
                        ) : (
                          user[info.key]
                        )}
                      </div>
                    </div>
                    <hr />
                  </React.Fragment>
                ))}
                <div className="row">
                  <div className="col-sm-12">
                    {isEditing ? (
                      <div>
                        <button className="btn btn-success" onClick={handleSave}>Save</button>
                        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                      </div>
                    ) : (
                      <a className="btn btn-info" onClick={handleEdit}>Edit</a>
                    )}
                  </div>
                </div>
              </div>
              
            </div>
            {/* Project Status Cards */}
            <div className="row gutters-sm">
               {[1].map((cardIndex) => (
                 <div className="col-sm-6 mb-3" key={cardIndex}>
                   <div className="card h-100">
                     <div className="card-body">
                       {/* <h6 className="d-flex align-items-center mb-3">
                         <i className="material-icons text-info mr-2">assignment</i>Project Status
                       </h6> */}
                       {[
                          { label: `Total created features on map: ${objectCount2}`, progress: 100 },
                          { label: `Total Points created: ${pointCount}`, progress: 100*pointCount/objectCount },
                          { label: `Total Linestrings created: ${lineCount}`, progress: 100*lineCount/objectCount },
                          { label: `Total Polygons created: ${polyCount}`, progress: 100*polyCount/objectCount }
                         // { label: "Backend API", progress: 66 }
                       ].map((proj, idx) => (
                         <div key={idx}>
                           <small>{proj.label}</small>
                           <div className="progress mb-3" style={{ height: "5px" }}>
                             <div
                               className="progress-bar bg-primary"
                               role="progressbar"
                               style={{ width: `${proj.progress}%` }}
                               aria-valuenow={proj.progress}
                               aria-valuemin="0"
                               aria-valuemax="100"
                             ></div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1000} />

    </div>
  );
};

export default Profile2;
