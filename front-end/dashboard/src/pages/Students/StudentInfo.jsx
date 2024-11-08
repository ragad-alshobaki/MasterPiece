import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../Admins/view_user.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

export default function StudentInfo() {
    const [studentInfo, setStudentInfo] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      fetchStudentData();
    }, [id]);
  
    const fetchStudentData = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/api/user/${id}`);
        console.log(result.data.users);
        setStudentInfo(result.data.users);
      } catch (err) {
        console.log("Something went wrong while fetching the student data.");
      }
    };

    const clickToBackHandler = () => {
        navigate("/students");
    };

    return(
        <div className="wrapper">
        <Sidebar />
        <div className="main">
          <Header />
          <main className="content">
            <div className="container-fluid p-0">
              <div className="page-header d-flex align-items-center justify-content-between">
                <h1 className="h3 mb-3">Student Information</h1>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title mb-0">ID No. {studentInfo.id}</h5>
                      <div>
                        <NavLink
                          to={`/student_update/${studentInfo.id}`}
                          className="btn btn-warning mx-1"
                        >
                          Edit
                        </NavLink>
                        <button
                          className="btn btn-primary mx-1"
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
                                src={
                                    studentInfo.user_image
                                    ? `http://127.0.0.1:8000/storage/users_images/${studentInfo.user_image}`
                                    : "https://afn.ca/wp-content/uploads/2022/12/unknown_staff-500x500.webp"
                                }
                                alt="User_Image"
                              />
                              {/* <span className="camera-icon">📷</span> */}
                            </div>
                          </div>
                          <div className="profile-details">
                            <p>
                              <strong>Name:</strong> {studentInfo.full_name}
                            </p>
                            <p>
                              <strong>Email:</strong> {studentInfo.email}
                            </p>
                            <p>
                              <strong>Role:</strong> {studentInfo.role}
                            </p>
                            <p>
                              <strong>Date of Birth:</strong> {studentInfo.dob}
                            </p>
                            {/* ✎ */}
                            {/* <button className="btn btn-warning"> Edit </button> */}
                          </div>
                        </div>
                      </div>
                      <h5 className="card-title mb-0">
                        Last update at ( {studentInfo.updated_at} )
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    )
}