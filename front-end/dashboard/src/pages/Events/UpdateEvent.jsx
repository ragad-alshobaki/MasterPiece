import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateEvent() {
  const { id } = useParams(); // Get the admin ID from URL params
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    // event_image: null,
  });
  const [eventImg, setEventImg] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEventData((values) => ({ ...values, [name]: value }));
  };

  const updateEventData = async () => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("event_date", eventData.event_date);
    formData.append("event_time", eventData.event_time);
    formData.append("event_image", eventImg);
    const response = await axios.post(
      `http://127.0.0.1:8000/api/event_update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    alert(response.data.message);
    console.log(response);
    setTimeout(() => {
      navigate("/events");
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const time = eventData.event_time.slice(0, 5);
    // if (!/^\d{2}:\d{2}$/.test(time)) {
    //   alert("Please ensure the time is in HH:mm format.");
    //   return;
    // }
    // console.log(eventData.event_time)
    await updateEventData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`http://localhost:8000/api/event/${id}`)
      .then(function (response) {
        console.log(response);
        setEventData(response.data.event);
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
  }

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <main className="content">
          <div className="container-fluid p-0">
            <div className="page-header d-flex align-items-center justify-content-between">
              <h1 className="h3 mb-3">Update Event</h1>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/events")}
              >
                Back
              </button>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Update Event Details</h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <label htmlFor="title">Event's Title</label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          value={eventData.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="description">Event's Description</label>
                        <input
                          type="text"
                          name="description"
                          className="form-control"
                          value={eventData.description}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="event_date">Event's Date</label>
                        <input
                          type="date"
                          name="event_date"
                          className="form-control"
                          value={eventData.event_date}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="event_time">Event's Time</label>
                        <input
                          type="time"
                          name="event_time"
                          className="form-control"
                          value={eventData.event_time.slice(0, 5)}
                          onChange={handleChange}
                          step="60"
                        />
                      </div> 
                      <div className="form-group mb-3">
                        <label htmlFor="event_image">Event's Image</label>
                        <input
                          type="file"
                          name="event_image"
                          className="form-control"
                          onChange={(e) => setEventImg(e.target.files[0])}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success">
                          Update Event
                        </button>
                      </div>
                    </form>
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
