import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Admin from "./Admins/Admin";
import Admins from "./Admins/Admins";
import CreateAdmin from "./Admins/CreateAdmin";
import UpdateAdmin from "./Admins/UpdateAdmin";
import Students from "./Students/Students";
import CreateStudent from "./Students/CreateStudent";
import StudentInfo from "./Students/StudentInfo";
import UpdateStudent from "./Students/UpdateStudent";
import Events from "./Events/Events";
import CreateEvent from "./Events/CreateEvent";
import EventInfo from "./Events/EventInfo";
import UpdateEvent from "./Events/UpdateEvent";
import Activities from "./Activities/Activities";
import CreateActivity from "./Activities/CreateActivity";
import ActivityInfo from "./Activities/ActivityInfo";
import UpdateActivity from "./Activities/UpdateActivity";

export default function ImportRouters() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/dashboard" element={<Main />} />

          {/* Admin Page Routes */}
          <Route path="/admins" element={<Admins />} />
          <Route path="/create_admin" element={<CreateAdmin />} />
          <Route path="/admin/:id" element={<Admin />} />
          <Route path="/admin_update/:id" element={<UpdateAdmin />} />

          {/* Student Page Routes */}
          <Route path="/students" element={<Students />} />
          <Route path="/create_student" element={<CreateStudent />} />
          <Route path="/student/:id" element={<StudentInfo />} />
          <Route path="/student_update/:id" element={<UpdateStudent />} />

          {/* Event Page Routes */}
          <Route path="/events" element={<Events />} />
          <Route path="/create_event" element={<CreateEvent />} />
          <Route path="/event/:id" element={<EventInfo />} />
          <Route path="/event_update/:id" element={<UpdateEvent />} />

          {/* Activity Page Routes */}
          <Route path="/activities" element={<Activities />} />
          <Route path="/create_activity" element={<CreateActivity />} />
          <Route path="/activity/:id" element={<ActivityInfo />} />
          <Route path="/activity_update/:id" element={<UpdateActivity />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
