import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const navigate = useNavigate();
  const clickToBackHandler = () => {
    navigate("/events");
  };

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    event_image: null,
  });
  const [eventImg, setEventImg] = useState("");

  const createEventData = async () => {
    console.log(eventImg);
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("event_date", eventData.event_date);
    formData.append("event_time", eventData.event_time);
    formData.append("event_image", eventImg);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/create_event",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response) {
      console.log(response);
      alert("Event Added successfully!");
      setTimeout(() => {
        navigate("/events");
      }, 1000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEventData();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setEventImg({
      ...eventImg,
      event_image: e.target.files[0],
    });
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
                <h1 className="h3 mb-3">Create New Event</h1>
                <button
                  className="btn btn-primary"
                  onClick={clickToBackHandler}
                >
                  {" "}
                  Back{" "}
                </button>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title mb-0">Add Event Details</h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                          <label htmlFor="title">Event's Title</label>
                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Enter Title of Event"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="description">Event's Description</label>
                          <input
                            type="text"
                            name="description"
                            className="form-control"
                            placeholder="Enter Description of Event"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="event_date">Event's Date</label>
                          <input
                            type="date"
                            name="event_date"
                            className="form-control"
                            placeholder="Enter Date of Event"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="event_time">Event's Time</label>
                          <input type="time" name="event_time" className="form-control" placeholder="Enter Time of Event" pattern="[0-9]{2}:[0-9]{2}" onChange={handleChange} required />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="event_image">Upload Image</label>
                          <input
                            type="file"
                            name="event_image"
                            className="form-control"
                            onChange={handleFileChange}
                          />
                        </div>
                        <div className="d-flex justify-content-center">
                          <button type="submit" className="btn btn-success ">
                            Add
                          </button>
                        </div>
                      </form>
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
