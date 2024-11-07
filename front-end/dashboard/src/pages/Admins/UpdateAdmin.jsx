import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateAdmin() {
  const { id } = useParams(); // Get the admin ID from URL params
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [adminData, setAdminData] = useState({
    nat_id: "",
    full_name: "",
    email: "",
    password: "",
    role: "",
    dob: "",
    gender: "",
  });
  const [adminImg, setAdminImg] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAdminData((values) => ({ ...values, [name]: value }));
  };

  const updateAdminData = async () => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("nat_id", adminData.nat_id);
    formData.append("full_name", adminData.full_name);
    formData.append("email", adminData.email);
    formData.append("password", adminData.password);
    formData.append("role", adminData.role);
    formData.append("user_image", adminImg);
    formData.append("dob", adminData.dob);
    formData.append("gender", adminData.gender);
    const response = await axios.post(
      `http://127.0.0.1:8000/api/user_update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    setMessage(response.data.message); //"message": "Successfully updated.."
    console.log(response);
    setTimeout(() => {
      navigate("/admins");
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAdminData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  function fetchUserData() {
    axios
      .get(`http://localhost:8000/api/user/${id}`)
      .then(function (response) {
        console.log(response);
        setAdminData(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
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
              <h1 className="h3 mb-3">Update Admin</h1>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/admins")}
              >
                Back
              </button>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Update Admin Details</h5>
                  </div>
                  <div className="card-body">
                    <p className="text-success">
                      <b>{message}</b>
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <label htmlFor="nat_id">National ID</label>
                        <input
                          type="text"
                          name="nat_id"
                          className="form-control"
                          placeholder="Enter National ID"
                          value={adminData.nat_id}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="full_name">Full Name</label>
                        <input
                          type="text"
                          name="full_name"
                          className="form-control"
                          placeholder="Enter Full Name"
                          value={adminData.full_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter Email"
                          value={adminData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Leave blank if not changing"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="role">Admin Role</label>
                        <select
                          type="text"
                          name="role"
                          className="form-control"
                          value={adminData.role}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Supervisor">Supervisor</option>
                          <option value="Teacher">Teacher</option>
                        </select>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          className="form-control"
                          value={adminData.dob}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="gender">Gender</label>
                        <select
                          name="gender"
                          className="form-control"
                          value={adminData.gender}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="user_image">Profile Image</label>
                        <input
                          type="file"
                          name="user_image"
                          className="form-control"
                          onChange={(e) => setAdminImg(e.target.files[0])}
                        />
                      </div>
                      <button type="submit" className="btn btn-success">
                        Update Admin
                      </button>
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
