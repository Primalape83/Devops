import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login         from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Overview      from "./pages/Overview";
import Teams         from "./pages/Teams";
import CreateTeam    from "./pages/CreateTeam";
import RegisterUser  from "./pages/RegisterUser";
import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"  element={<Login />} />

        {/* Admin — nested under the shell layout */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index              element={<Overview />} />
          <Route path="teams"       element={<Teams />} />
          <Route path="teams/create" element={<CreateTeam />} />
          <Route path="register"    element={<RegisterUser />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}