import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateActivity() {
  const { id } = useParams(); // Get the admin ID from URL params
  const navigate = useNavigate();

  const [activityData, setActivityData] = useState({
    title: "",
    description: "",
    activity_date: "",
    activity_time: "",
    // activity_image: null,
  });
  const [activityImg, setActivityImg] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setActivityData((values) => ({ ...values, [name]: value }));
  };

  const updateActivityData = async () => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("title", activityData.title);
    formData.append("description", activityData.description);
    formData.append("activity_date", activityData.activity_date);
    formData.append("activity_time", activityData.activity_time);
    formData.append("activity_image", activityImg);
    const response = await axios.post(
      `http://127.0.0.1:8000/api/activity_update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    alert(response.data.message);
    console.log(response);
    setTimeout(() => {
      navigate("/activities");
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateActivityData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`http://localhost:8000/api/activity/${id}`)
      .then(function (response) {
        console.log(response);
        setActivityData(response.data.activity);
      })
      .catch((error) => {
        console.error("Error fetching activity data:", error);
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
              <h1 className="h3 mb-3">Update Activity</h1>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/activities")}
              >
                Back
              </button>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Update Activity Details</h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <label htmlFor="title">Activity Title</label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          value={activityData.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="description">Activity Description</label>
                        <input
                          type="text"
                          name="description"
                          className="form-control"
                          value={activityData.description}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="activity_date">Activity Date</label>
                        <input
                          type="date"
                          name="activity_date"
                          className="form-control"
                          value={activityData.activity_date}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="activity_time">Activity Time</label>
                        <input
                          type="time"
                          name="activity_time"
                          className="form-control"
                          value={activityData.activity_time.slice(0, 5)}
                          onChange={handleChange}
                          step="60"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="activity_image">Activity Image</label>
                        <input
                          type="file"
                          name="activity_image"
                          className="form-control"
                          onChange={(e) => setActivityImg(e.target.files[0])}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success">
                          Update Activity
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
