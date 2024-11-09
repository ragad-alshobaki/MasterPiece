import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="index.html">
          <span className="align-middle">AdminKit</span>
        </a>

        <ul className="sidebar-nav">
          <li className="sidebar-header">{/* Pages */}</li>

          <li className="sidebar-item active">
            {/* <a className="sidebar-link" href="/dashboard"> */}
            <NavLink
              to={`/dashboard`}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <i className="align-middle fa-light fa-gauge"></i>
              <span className="align-middle">Dashboard</span>
            </NavLink>
            {/* </a> */}
          </li>

          <li className="sidebar-item">
            {/* <a className="sidebar-link" href="/admins"> */}
            <NavLink to={`/admins`} 
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }>
              <i className="align-middle fa-light fa-user-tie"></i>
              <span className="align-middle">Admins</span>
              {/* </a> */}
            </NavLink>
          </li>

          <li className="sidebar-item">
            {/* <a className="sidebar-link" href="pages-profile.html"> */}
            <NavLink to={`/Students`} className="sidebar-link">
              <i className="align-middle fa-light fa-screen-users"></i>
              <span className="align-middle">students</span>
              {/* </a> */}
            </NavLink>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="pages-sign-in.html">
              <i className="align-middle fa-light fa-bell-school"></i>
              <span className="align-middle">Classes</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="pages-sign-up.html">
              <i className="align-middle fa-light fa-books"></i>
              <span className="align-middle">Courses</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="pages-blank.html">
              <i className="align-middle fa-light fa-arrow-right-to-bracket"></i>
              <span className="align-middle">Enrollment</span>
            </a>
          </li>

          <li className="sidebar-item">
            <NavLink to={`/events`} className="sidebar-link">
              <i className="align-middle fa-light fa-calendar-star"></i>
              <span className="align-middle">Events</span>
             </NavLink>
          </li>

          <li className="sidebar-item">
          <NavLink to={`/activities`} className="sidebar-link">
              <i className="align-middle fa-light fa-square-star"></i>
              <span className="align-middle">Activities</span>
             </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
