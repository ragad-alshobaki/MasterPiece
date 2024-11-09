import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateActivity() {
  const navigate = useNavigate();
  const clickToBackHandler = () => {
    navigate("/activities");
  };

  const [activityData, setActivityData] = useState({
    title: "",
    description: "",
    activity_date: "",
    activity_time: "",
    activity_image: null,
  });
  const [activityImg, setActivityImg] = useState("");

  const createActivityData = async () => {
    console.log(activityImg);
    const formData = new FormData();
    formData.append("title", activityData.title);
    formData.append("description", activityData.description);
    formData.append("activity_date", activityData.activity_date);
    formData.append("activity_time", activityData.activity_time);
    formData.append("activity_image", activityImg);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/create_activity",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response) {
      console.log(response);
      alert("Activity Added successfully!");
      setTimeout(() => {
        navigate("/activities");
      }, 1000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createActivityData();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivityData({
      ...activityData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setActivityImg({
      ...activityImg,
      activity_image: e.target.files[0],
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
                <h1 className="h3 mb-3">Create New Activity</h1>
                <button
                  className="btn btn-primary"
                  onClick={clickToBackHandler}
                >
                  Back
                </button>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title mb-0">Add Activity Details</h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                          <label htmlFor="title">Activity Title</label>
                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Enter Activity Title"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="description">
                          Activity Description
                          </label>
                          <input
                            type="text"
                            name="description"
                            className="form-control"
                            placeholder="Enter Activity Description"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="activity_date">Activity Date</label>
                          <input
                            type="date"
                            name="activity_date"
                            className="form-control"
                            placeholder="Enter Activity Date"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="activity_time">Activity Time</label>
                          <input
                            type="time"
                            name="activity_time"
                            className="form-control"
                            placeholder="Enter Activity Time"
                            pattern="[0-9]{2}:[0-9]{2}"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="activity_image">Upload Image</label>
                          <input
                            type="file"
                            name="activity_image"
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
