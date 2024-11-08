import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [studentData, setStudentData] = useState({
    nat_id: "",
    full_name: "",
    email: "",
    password: "",
    role: "",
    dob: "",
    gender: "",
  });
  const [studentImg, setStudentImg] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setStudentData((values) => ({ ...values, [name]: value }));
  };
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     if (name !== "user_image") {  // Handle normal inputs
//       setStudentData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleFileChange = (e) => {
//     setStudentImg(e.target.files[0]);  // Handle image file separately
//   };

  const updateStudentData = async () => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("nat_id", studentData.nat_id);
    formData.append("full_name", studentData.full_name);
    formData.append("email", studentData.email);
    formData.append("password", studentData.password);
    formData.append("role", studentData.role);
    formData.append("user_image", studentImg);
    formData.append("dob", studentData.dob);
    formData.append("gender", studentData.gender);
    const response = await axios.post(
      `http://127.0.0.1:8000/api/user_update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    setMessage(response.data.message);
    console.log(response);
    setTimeout(() => {
      navigate("/students");
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateStudentData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  function fetchUserData() {
    axios
      .get(`http://localhost:8000/api/user/${id}`)
      .then(function (response) {
        console.log(response);
        setStudentData(response.data.users);
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
              <h1 className="h3 mb-3">Update Student</h1>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/students")}
              >
                Back
              </button>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Update Student Details</h5>
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
                          value={studentData.nat_id}
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
                          value={studentData.full_name}
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
                          value={studentData.email}
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
                        <label htmlFor="role">Student Role</label>
                        <select
                          type="text"
                          name="role"
                          className="form-control"
                          value={studentData.role}
                          onChange={handleChange}
                          disabled
                        >
                          <option value="">{studentData.role}</option>
                        </select>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          className="form-control"
                          value={studentData.dob}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="gender">Gender</label>
                        <select
                          name="gender"
                          className="form-control"
                          value={studentData.gender}
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
                          onChange={(e) => setStudentImg(e.target.files[0])}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success">
                          Update Student
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
