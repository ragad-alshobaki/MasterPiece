import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";

export default function ImportRouter() {
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
            </Routes>
            </BrowserRouter>
        </div>
    )
}