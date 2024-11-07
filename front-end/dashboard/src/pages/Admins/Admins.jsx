import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Admins() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios("http://127.0.0.1:8000/api/users");
        // console.log(result)
        // console.log(result.data)
        // console.log(result.data.result);
        // setUserData(result.data.result);
        const filteredAdmins = result.data.result.filter(
          (user) => user.role === "Supervisor" || user.role === "Teacher"
        );
        setUserData(filteredAdmins);
      } catch (error) {
        // console.log("Somthing went wrong");
        alert("Something went wrong");
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    // console.log(id)
    const isConfirmed = window.confirm("Are you sure you want to delete this admin?");
    if (!isConfirmed) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user_delete/${id}`);
      const newUserData = userData.filter((item) => item.id !== id);
      setUserData(newUserData);
    } catch (error) {
      alert("Something went wrong while deleting the admin.");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSort = () => {
    const sortedData = [...userData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.full_name.localeCompare(b.full_name);
      } else {
        return b.full_name.localeCompare(a.full_name);
      }
    });
    setUserData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
                            <th scope="col">Sr.No.</th>
                            <th scope="col">National ID</th>
                            <th scope="col">Full Name 
                              <button className="btn p-0" onClick={handleSort}>
                              {/* btn-link */}
                                 {sortOrder === "asc" ? "▲" : "▼"}
                              </button>
                            </th>
                            <th scope="col">Role</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.map((admin, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{admin.nat_id}</td>
                              <td className="sortable">{admin.full_name}</td>
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
