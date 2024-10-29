import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Main() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios("http://127.0.0.1:8000/api/users");
      // console.log(result)
      // console.log(result.data)
      // console.log(result.data.result);
      setUserData(result.data.result);
    } catch (error) {
      // console.log("Somthing went wrong");
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    // console.log(id)
    await axios.delete(`http://127.0.0.1:8000/api/admin_delete/${id}`);
    const newUserData = userData.filter((item) => item.id !== id);
    setUserData(newUserData);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = userData.filter(
    (admin) =>
      admin.nat_id.toString().toLowerCase().includes(searchTerm) ||
      admin.full_name.toLowerCase().includes(searchTerm) ||
      admin.role.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <main className="content">
          <div className="container-fluid p-0">
            <div className="page-header d-flex align-items-center justify-content-between">
              <h1 className="h3 mb-3">Admins Information</h1>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="card-title mb-0">Details Table</h5>
                    <NavLink to={`/create_admin`} className="btn btn-success btn-rounded btn-fw"> Add Admin </NavLink>
                  </div>
                  <div className="card-body">
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
                      <table className="table table-striped table-hover table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">National ID</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.map((admin, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{admin.nat_id}</td>
                              <td>{admin.full_name}</td>
                              <td>{admin.role}</td>
                              <td>
                                <NavLink to={`/admin/${admin.id}`} className="btn btn-info mx-1">View</NavLink>
                                <NavLink to={`/admin_update/${admin.id}`} className="btn btn-warning mx-1">Edit</NavLink>
                                <button className="btn btn-danger" onClick={() => handleDelete(admin.id)}>Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
