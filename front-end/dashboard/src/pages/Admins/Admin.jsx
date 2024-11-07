import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import './t.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Admin() {
  const [admin, setAdmin] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchAdminData();
  }, [id]);

  const fetchAdminData = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/api/user/${id}`);
      console.log(result.data.users);
      setAdmin(result.data.users);
    } catch (err) {
      console.log("Something went wrong while fetching the admin data.");
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
            <div className="page-header d-flex align-items-center justify-content-between">
              <h1 className="h3 mb-3">Admin Information</h1>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="card-title mb-0">
                      Details of {admin.full_name}
                    </h5>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={clickToBackHandler}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                  <div className="card">
                    <div className="profile-card">
                      <div className="profile-image-section">
                        <div className="profile-image">
                          <img
                            src={admin.user_image 
                              ? `http://127.0.0.1:8000/storage/public/users_images/${admin.user_image}`
                              : "https://afn.ca/wp-content/uploads/2022/12/unknown_staff-500x500.webp"}
                            alt="User_Image"
                          />
                          <span className="camera-icon">📷</span>
                        </div>
                        {/* <div className="upload-buttons">
                          <button className="upload-button">LOGO</button>
                          <button className="upload-button">VENDOR DOCUMENTS</button>
                        </div> */}
                      </div>
                      <div className="profile-details">
                        <p>
                          <strong>Name:</strong> {admin.full_name}
                        </p>
                        <p>
                          <strong>Email:</strong> {admin.email}
                        </p>
                        <p>
                          <strong>Role:</strong> {admin.role}
                        </p>
                        <p>
                          <strong>Date of Birth:</strong> {admin.dob}
                        </p>
                        {/* ✎ */}
                        <button className="btn btn-warning"> Edit </button>
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
