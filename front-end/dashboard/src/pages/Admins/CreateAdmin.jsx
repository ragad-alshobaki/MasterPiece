import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAdmin() {
  const navigate = useNavigate();
  const clickToBackHandler = () => {
    navigate("/admins");
  };

  const [adminData, setAdminData] = useState({
    nat_id: "",
    full_name: "",
    email: "",
    password: "",
    role: "",
    // user_image: null,
    dob: "",
    gender: "",
  });
  const [adminImg, setAdminImg] = useState("");

  const createAdminData = async()=>{
    console.log(adminImg)
    const formData= new FormData();
    formData.append('nat_id', adminData.nat_id);
    formData.append('full_name',adminData.full_name);
    formData.append('email',adminData.email);
    formData.append('password',adminData.password);
    formData.append('role',adminData.role);
    formData.append('user_image', adminImg);
    formData.append('dob',adminData.dob);
    formData.append('gender',adminData.gender);

    const response= await axios.post("http://127.0.0.1:8000/api/create_user", formData, {
      headers:{'Content-Type':"multipart/form-data"},
    } );

    if(response)
    {
      console.log(response)
      alert("Admin Added successfully!");
      setTimeout(()=>{
          navigate('/admins');
      }, 1000);
    }
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    await createAdminData();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setAdminImg({
      ...adminImg,
      user_image: e.target.files[0],
    });
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = new FormData();
  //   for (const key in adminData) {
  //     data.append(key, adminData[key]);
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/api/create_user",
  //       data,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     alert(response.data.message);
      // console.log(response);
      // alert("Admin Added successfully!");
  //     navigate(`/admins`);
  //   } catch (error) {
  //     console.error("There was an error!", error.response);
  //     if (error.response && error.response.data && error.response.data.errors) {
  //       // Show validation errors from Laravel
  //       alert(JSON.stringify(error.response.data.errors));
  //     } else {
  //     alert("Something Wrong, Try again, & Check all fields!");
  //   }
  // }
  // };

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
                <button className="btn btn-primary" onClick={clickToBackHandler}> Back </button>
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
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                          <label htmlFor="nat_id">National ID</label>
                          <input type="text" name="nat_id" className="form-control" placeholder="Enter National ID" onChange={handleChange} required />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="full_name">Full Name</label>
                          <input type="text" name="full_name" className="form-control" placeholder="Enter Full Name" onChange={handleChange} required />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="email">Email</label>
                          <input type="email" name="email" className="form-control" placeholder="Enter Email" onChange={handleChange} required />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="password">Password</label>
                          <input type="password" name="password" className="form-control" placeholder="Enter Password" onChange={handleChange} required />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="role">Admin Role</label>
                          <select type="text" name="role" className="form-select mb-3" onChange={handleChange} required >
                            <option defaultValue>Select Admin Role</option>
                            {/* <option>adminstration</option> */}
                            <option>Supervisor</option>
                            <option>Teacher</option>
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="dob">Date of Birth</label>
                          <input type="date" name="dob" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="gender"></label>
                          <select name="gender" className="form-select mb-3" onChange={handleChange} required >
                            <option defaultValue>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="user_image">Image</label>
                          <input type="file" name="user_image" className="form-control" onChange={handleFileChange} />
                        </div>
                        <div className="d-flex justify-content-center">
                          <button type="submit" className="btn btn-success "> Add </button>
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
