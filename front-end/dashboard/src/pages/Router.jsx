import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Admin from "./Admins/Admin";
import Admins from "./Admins/Admins";
import CreateAdmin from "./Admins/CreateAdmin";
import UpdateAdmin from "./Admins/UpdateAdmin";

export default function ImportRouters() {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/dashboard" element={<Main />} />
                    {/* Admin Page Routes */}
                    <Route path="/admins" element={<Admins />} />
                    <Route path="/create_admin" element={<CreateAdmin />} />
                    <Route path="/admin/:id" element={<Admin />} />
                    <Route path="/admin_update/:id" element={<UpdateAdmin />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}