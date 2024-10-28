import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import axios from "axios";
import React, { useState  } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAdmin() {
  const [adminField, setAdminField] = useState({
    nat_id: "",
    full_name: "",
    email: "",
    password: "",
    role: "",
    user_image: "",
    dob: "",
    gender: "",
  });

  const adminFieldHandler = (e) => {
    setAdminField({
      ...adminField,
      [e.target.name]: e.target.value,
    });
    //console.log(userField);
  };
  const navigate = useNavigate();
  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create_user",
        adminField
      );
      console.log(response);
      alert("Admin Added successfully!");
      navigate("/admins");
    } catch (error) {
      console.log("Something Wrong");
      alert("Something Wrong, Try again, & Check all fields!");
    }
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
                <h1 className="h3 mb-3">Create New Admin</h1>
                {/* <a href="/create_admin" className="btn btn-success btn-rounded btn-fw" >
                  Add Admin
                </a> */}
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title mb-0">Add Admin Details</h5>
                    </div>
                    <div className="card-body">
                      <form autoComplete="off">
                        <div className="form-group mb-3">
                          <label htmlFor="nat_id">National ID</label>
                          <input
                            type="text"
                            name="nat_id"
                            className="form-control"
                            placeholder="Enter National ID"
                            onChange={(e) => adminFieldHandler(e)}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="full_name">Full Name</label>
                          <input
                            type="text"
                            name="full_name"
                            className="form-control"
                            placeholder="Enter Admin Full Name"
                            onChange={(e) => adminFieldHandler(e)}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Admin Email"
                            onChange={(e) => adminFieldHandler(e)}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter Password"
                            onChange={(e) => adminFieldHandler(e)}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="role">Admin Role</label>
                          <select
                          name="role"
                            className="form-select mb-3"
                            onChange={(e) => adminFieldHandler(e)}
                          >
                            <option defaultValue>Select Admin Role</option>
                            {/* <option>adminstration</option> */}
                            <option>Supervisor</option>
                            <option>Teacher</option>
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="user_image">Image</label>
                          <input
                            type="file"
                            name="user_image"
                            className="form-control"
                            placeholder="Select Image"
                            onChange={(e) => adminFieldHandler(e)}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="dob">Date of Birth</label>
                          <input
                            type="date"
                            name="dob"
                            className="form-control"
                            placeholder="Enter Date of Birth"
                            onChange={(e) => adminFieldHandler(e)}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="gender"></label>
                          <select
                            name="gender"
                            className="form-select mb-3"
                            onChange={(e) => adminFieldHandler(e)}
                          >
                            <option defaultValue>Select Admin Gender</option>
                            {/* <option>adminstration</option> */}
                            <option>Female</option>
                            <option>Male</option>
                          </select>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-success"
                          onClick={(e) => onSubmitChange(e)}
                        >
                          Add
                        </button>
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
