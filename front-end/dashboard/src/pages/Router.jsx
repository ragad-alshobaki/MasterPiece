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
        </Routes>
      </BrowserRouter>
    </div>
  );
}