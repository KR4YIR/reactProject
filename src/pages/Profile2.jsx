import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../redux/authSlice";
import "./profile.css"
import { logout } from "../redux/authSlice";
const Profile2 = () => {
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
  const token = localStorage.getItem('token')
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  return (
    <div className="container">
      <div className="main-body">

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" onClick={handleHome}><a>Home</a></li>
            {userRole === 'admin' &&  <li className="breadcrumb-item"><a href="javascript:void(0)">User</a></li>}

           
            <li className="breadcrumb-item active" aria-current="page">User Profile</li>
          </ol>
        </nav>

        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>{user.name} {user.surname}</h4>
                    {/* <p className="text-secondary mb-1">Full Stack Developer</p>
                    <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p> */}
                    <button className="btn btn-primary" onClick={handleHome}>Home</button>
                    <button className="btn btn-outline-primary" onClick={()=>dispatch(logout())}>LogOut</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                {/* Social Links */}
                {[
                //   { label: "Website", icon: "globe", value: "https://bootdey.com" },
                //   { label: "Github", icon: "github", value: "bootdey" },
                //   { label: "Twitter", icon: "twitter", value: "@bootdey", textColor: "text-info" },
                //   { label: "Instagram", icon: "instagram", value: "bootdey", textColor: "text-danger" },
                //   { label: "Facebook", icon: "facebook", value: "bootdey", textColor: "text-primary" }
                ].map((item, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <i className={`feather feather-${item.icon} mr-2 icon-inline ${item.textColor || ''}`}></i>
                      {item.label}
                    </h6>
                    <span className="text-secondary">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                {[
                  { label: "Name", value: user.name },
                  { label: "Surname", value: user.surname },
                  { label: "Email", value: user.email },
                //   { label: "Mobile", value: "(320) 380-4539" },
                //   { label: "Address", value: "Bay Area, San Francisco, CA" },
                ].map((info, i) => (
                  <React.Fragment key={i}>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">{info.label}</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {info.label === "Email" ? (
                          <a href={`mailto:${info.value}`}>{info.value}</a>
                        ) : (
                          info.value
                        )}
                      </div>
                    </div>
                    <hr />
                  </React.Fragment>
                ))}
                <div className="row">
                  <div className="col-sm-12">
                    <a
                      className="btn btn-info"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => navigate('/')}
                    >
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Status Cards */}
            <div className="row gutters-sm">
              {[1, 2].map((cardIndex) => (
                <div className="col-sm-6 mb-3" key={cardIndex}>
                  <div className="card h-100">
                    <div className="card-body">
                      {/* <h6 className="d-flex align-items-center mb-3">
                        <i className="material-icons text-info mr-2">assignment</i>Project Status
                      </h6> */}
                      {[
                        // { label: "Web Design", progress: 80 },
                        // { label: "Website Markup", progress: 72 },
                        // { label: "One Page", progress: 89 },
                        // { label: "Mobile Template", progress: 55 },
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
    </div>
  );
};

export default Profile2;
