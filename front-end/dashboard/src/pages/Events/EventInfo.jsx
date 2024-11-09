import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../Admins/view_user.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

export default function EventInfo() {
    const [eventInfo, setEventInfo] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      fetchEventData();
    }, [id]);
  
    const fetchEventData = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/api/event/${id}`);
        console.log(result.data.event);
        setEventInfo(result.data.event);
      } catch (err) {
        console.log("Something went wrong while fetching the event data.");
      }
    };

    const clickToBackHandler = () => {
        navigate("/events");
    };

    return(
        <div className="wrapper">
        <Sidebar />
        <div className="main">
          <Header />
          <main className="content">
            <div className="container-fluid p-0">
              <div className="page-header d-flex align-items-center justify-content-between">
                <h1 className="h3 mb-3">Event Information</h1>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title mb-0">ID No. {eventInfo.id}</h5>
                      <div>
                        <NavLink
                          to={`/event_update/${eventInfo.id}`}
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
                                    eventInfo.event_image
                                    ? `http://127.0.0.1:8000/storage/events_images/${eventInfo.event_image}`
                                    : "https://cdn.prod.website-files.com/602a043d17d7780d1cce562e/64d05f9b7dd7f56be0e874f8_euDBAAAGa3TkPagCV0pjg0t5kyRaFzrPiQVqg4LtHwRnLwrIA-out-0.webp"
                                }
                                alt="Event_Image"
                              />
                              {/* <span className="camera-icon">📷</span> */}
                            </div>
                          </div>
                          <div className="profile-details">
                            <p>
                              <strong>Event's Title:</strong> {eventInfo.title}
                            </p>
                            <p>
                              <strong>Event's Description:</strong> {eventInfo.description}
                            </p>
                            <p>
                              <strong>Event's Date:</strong> {eventInfo.event_date}
                            </p>
                            <p>
                              <strong>Event's Time:</strong> {eventInfo.event_time}
                            </p>
                            {/* ✎ */}
                            {/* <button className="btn btn-warning"> Edit </button> */}
                          </div>
                        </div>
                      </div>
                      <h5 className="card-title mb-0">
                        Last update at ( {eventInfo.updated_at} )
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