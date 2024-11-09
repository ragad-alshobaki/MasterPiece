import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Events() {
    const [eventData, setEventData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await axios("http://127.0.0.1:8000/api/events");
            // console.log(result)
            // console.log(result.data)
            // console.log(result.data.result);
            // setUserData(result.data.result);
            // const filteredEvents = result.data.result.filter(
            //   (user) => user.role === "Student"
            // );
            setEventData(result.data.result);
          } catch (error) {
            // console.log("Somthing went wrong");
            alert("Something went wrong hwile fetching data");
          }
        };
        fetchData();
      }, []);

      const handleDelete = async (id) => {
        // console.log(id)
        const isConfirmed = window.confirm("Are you sure you want to delete this Event?");
        if (!isConfirmed) return;
        try {
          await axios.delete(`http://127.0.0.1:8000/api/event_delete/${id}`);
          const newUserData = eventData.filter((item) => item.id !== id);
          setEventData(newUserData);
        } catch (error) {
          alert("Something went wrong while deleting the event.");
        }
      };

      const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
      };

      const handleSort = () => {
        const sortedData = [...eventData].sort((a, b) => {
          if (sortOrder === "asc") {
            return a.title.localeCompare(b.title);
          } else {
            return b.title.localeCompare(a.title);
          }
        });
        setEventData(sortedData);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      };
    
      const filteredData = eventData.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm) ||
          event.event_date.toString().toLowerCase().includes(searchTerm) ||
          event.event_time.toString().toLowerCase().includes(searchTerm)
      );

    return(
        <div className="wrapper">
        <Sidebar />
        <div className="main">
          <Header />
          <main className="content">
            <div className="container-fluid p-0">
              <div className="page-header d-flex align-items-center justify-content-between">
                <h1 className="h3 mb-3">Events Information</h1>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title mb-0">Details Table</h5>
                      <NavLink to={`/create_event`} className="btn btn-success btn-rounded btn-fw"> Add Event </NavLink>
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
                              <th scope="col">Event Title</th>
                              <th scope="col">Event Date 
                                <button className="btn p-0" onClick={handleSort}>
                                {/* btn-link */}
                                   {sortOrder === "asc" ? "▲" : "▼"}
                                </button>
                              </th>
                              <th scope="col">Event Time 
                                <button className="btn p-0" onClick={handleSort}>
                                {/* btn-link */}
                                   {sortOrder === "asc" ? "▲" : "▼"}
                                </button>
                              </th>
                              <th scope="col" style={{ width: 250 }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData.map((event, i) => (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{event.title}</td>
                                <td className="sortable">{event.event_date}</td>
                                <td className="sortable">{event.event_time}</td>
                                {/* <td> */}
                                    {/* {student.role} */}

                                {/* </td> */}
                                <td>
                                  <NavLink to={`/event/${event.id}`} className="btn btn-info mx-1">View</NavLink>
                                  <NavLink to={`/event_update/${event.id}`} className="btn btn-warning mx-1">Edit</NavLink>
                                  <button className="btn btn-danger mx-1" onClick={() => handleDelete(event.id)}>Delete</button>
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
    )
}