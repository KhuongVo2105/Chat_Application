import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Test from './home/Test';
import Login from "./login/Login";
import Register from "./login/Register";
import Blog from "./admin/blog/Blog";

import BlogForm from "./admin/blogDetail/BlogDetail";
import AdminHome from "./admin/AdminHome/AdminHome";
import Dashboard from "./admin/Dashboard/Dashboard";
import Unauthorized from "./admin/users/Unauthorized";
import UserList from "./admin/users/UserList";
import AdminRegister from "./admin/users/AdminRegister";

function RouterConfig() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />}>
          <Route index path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
        <Route path="/admin" element={<AdminHome />}>
          <Route index element={<Dashboard />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="blogDetail" element={<BlogForm />} />
          <Route path="blogDetail/:blogId" element={<BlogForm />} />
          <Route path="users" element={<UserList />} />
          <Route path="adminCreate" element={<AdminRegister />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RouterConfig;
