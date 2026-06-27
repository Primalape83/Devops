import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login               from "./pages/Login";
import AdminDashboard      from "./pages/AdminDashboard";
import Overview            from "./pages/Overview";
import Teams               from "./pages/Teams";
import CreateTeam          from "./pages/CreateTeam";
import RegisterUser        from "./pages/RegisterUser";
import ManagerDashboard    from "./pages/ManagerDashboard";
import ManagerOverview     from "./pages/ManagerOverview";
import ManagerTeam         from "./pages/ManagerTeam";
import ManagerTasks        from "./pages/ManagerTasks";
import EmployeeDashboard   from "./pages/EmployeeDashboard";
import EmployeeOverview    from "./pages/EmployeeOverview";
import EmployeeTasks       from "./pages/EmployeeTasks";
import EmployeeTeam        from "./pages/EmployeeTeam";
import EmployeeInvitations from "./pages/EmployeeInvitations";
import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index             element={<Overview />} />
          <Route path="teams"      element={<Teams />} />
          <Route path="teams/create" element={<CreateTeam />} />
          <Route path="register"   element={<RegisterUser />} />
        </Route>

        {/* Team Manager */}
        <Route path="/manager" element={<ManagerDashboard />}>
          <Route index        element={<ManagerOverview />} />
          <Route path="team"  element={<ManagerTeam />} />
          <Route path="tasks" element={<ManagerTasks />} />
        </Route>

        {/* Employee */}
        <Route path="/employee" element={<EmployeeDashboard />}>
          <Route index               element={<EmployeeOverview />} />
          <Route path="tasks"        element={<EmployeeTasks />} />
          <Route path="team"         element={<EmployeeTeam />} />
          <Route path="invitations"  element={<EmployeeInvitations />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}