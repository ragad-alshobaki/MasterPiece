import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
// import '../app.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Admin() {
  // console.log(id);
  const [admin, setAdmin] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchAdminData();
  }, [id]);

  const fetchAdminData = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8000/api/user/" + id);
      console.log(result.data.users);
      setAdmin(result.data.users);
    } catch (err) {
      console.log("Something Wrong");
    }
  };

  const clickToBackHandler = () => {
    navigate("/admins");
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <main className="content">
          <div className="container-fluid p-0">
            <div className="container-fluid p-0">
              <div className="page-header d-flex align-items-center justify-content-between">
                <h1 className="h3 mb-3">Admins Information</h1>
                {/* <a href="/create_admin" className="btn btn-success btn-rounded btn-fw" >
                Add Admin
              </a> */}
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title mb-0">
                        Details of {admin.full_name}
                      </h5>
                      {/* <a href="/create_admin" className="btn btn-success btn-rounded btn-fw">
                      Add Admin
                    </a> */}
                      {/* <NavLink to={`/create_admin`} className="btn btn-success btn-rounded btn-fw"> Add Admin </NavLink> */}
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={clickToBackHandler}
                        >
                          Back To Home
                        </button>
                      </div>
                    </div>
                    <div className="card mb-3" style={{ maxWidth: 540 }}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={admin.user_image}
                            className="img-fluid rounded-start"
                            alt="assets/img/avatars/no_img-user"
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{admin.full_name}</h5>
                            <p className="card-text"> {admin.email} </p>
                            <p className="card-text"> {admin.role} </p>
                            <p className="card-text"> {admin.dob} </p>
                            <p className="card-text"> {admin.gender} </p>
                            <p className="card-text">
                              <small className="text-body-secondary">
                                Last update in {admin.updated_at}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
