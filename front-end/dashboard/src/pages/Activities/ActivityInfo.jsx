import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../Admins/view_user.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

export default function ActivityInfo() {
  const [activityInfo, setActivityInfo] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchActivityData();
  }, [id]);

  const fetchActivityData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/api/activity/${id}`
      );
      console.log(result.data.activity);
      setActivityInfo(result.data.activity);
    } catch (err) {
      console.log("Something went wrong while fetching the activity data.");
    }
  };

  const clickToBackHandler = () => {
    navigate("/activities");
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <main className="content">
          <div className="container-fluid p-0">
            <div className="page-header d-flex align-items-center justify-content-between">
              <h1 className="h3 mb-3">Activity Information</h1>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="card-title mb-0">ID No. {activityInfo.id}</h5>
                    <div>
                      <NavLink
                        to={`/activity_update/${activityInfo.id}`}
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
                                activityInfo.activity_image
                                  ? `http://127.0.0.1:8000/storage/activities_images/${activityInfo.activity_image}`
                                  : "https://www.shutterstock.com/image-vector/simple-illustration-after-school-activities-600nw-2349418281.jpg"
                              }
                              alt="Activity_Image"
                            />
                            {/* <span className="camera-icon">📷</span> */}
                          </div>
                        </div>
                        <div className="profile-details">
                          <p>
                            <strong>Activity Title:</strong> {activityInfo.title}
                          </p>
                          <p>
                            <strong>Activity Description:</strong>
                            {activityInfo.description}
                          </p>
                          <p>
                            <strong>Activity Date:</strong>
                            {activityInfo.activity_date}
                          </p>
                          <p>
                            <strong>Activity Time:</strong>
                            {activityInfo.activity_time}
                          </p>
                          {/* ✎ */}
                          {/* <button className="btn btn-warning"> Edit </button> */}
                        </div>
                      </div>
                    </div>
                    <h5 className="card-title mb-0">
                      Last update at ( {activityInfo.updated_at} )
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
  );
}
