import "./AdminHome.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { TfiWrite } from "react-icons/tfi";
import { MdContactMail, MdDashboard } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reduxStore/Store";
import { FaBookOpen, FaComment, FaUserCog } from "react-icons/fa";
import { logoutCurrentUser } from "../../reduxStore/UserSlice";
import { FaUserPlus } from "react-icons/fa6";
import axios from "axios";

const AdminHome = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [clickDashBoard, setClickDashBoard] = useState(true);
  const [clickBlog, setClickBlog] = useState(false);
  const [clickContact, setClickContact] = useState(false);
  const [clickUsers, setClickUsers] = useState(false);
  const [clickReportBlog, setClickReportBlog] = useState(false);
  const [clickCategory, setClickCategory] = useState(false);
  const [clickComment, setClickComment] = useState(false);
  const [clickCreateAdmin, setClickCreateAdmin] = useState(false);

  const handleLogout = () => {
    dispatch(logoutCurrentUser());
    localStorage.removeItem("authToken");
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerDashboard = () => {
    setClickDashBoard(true);
    setClickContact(false);
    setClickBlog(false);
    setClickUsers(false);
    setClickCategory(false);
    setClickComment(false);
    setClickCreateAdmin(false);
    setClickReportBlog(false);
  };
  const handlerBlog = () => {
    setClickDashBoard(false);
    setClickContact(false);
    setClickBlog(true);
    setClickUsers(false);
    setClickCategory(false);
    setClickComment(false);
    setClickCreateAdmin(false);
    setClickReportBlog(false);
  };
  const handlerUsers = () => {
    setClickDashBoard(false);
    setClickContact(false);
    setClickBlog(false);
    setClickUsers(true);
    setClickCategory(false);
    setClickComment(false);
    setClickCreateAdmin(false);
    setClickReportBlog(false);
  };
  const handlerReportBlog = () => {
    setClickDashBoard(false);
    setClickContact(false);
    setClickBlog(false);
    setClickUsers(false);
    setClickReportBlog(true);
    setClickComment(false);
    setClickCreateAdmin(false);
  };
  const createAdmin = () => {
    setClickDashBoard(false);
    setClickContact(false);
    setClickBlog(false);
    setClickUsers(false);
    setClickCategory(false);
    setClickComment(false);
    setClickCreateAdmin(true);
    setClickReportBlog(false);
  };
  return (
    <div className="container">
      <div className="sidebar">
        <Link to={"/"}>
          <h2>Blog Website</h2>
        </Link>
        <div className="solid"></div>
        <ul>
          <li onClick={() => handlerDashboard()}>
            <Link to="/admin" className={clickDashBoard ? "Click" : ""}>
              <MdDashboard /> Dashboard
            </Link>
          </li>
          <li onClick={() => handlerBlog()}>
            <Link to="/admin/blogs" className={clickBlog ? "Click" : ""}>
              <TfiWrite /> Quản Lý Bài Viết
            </Link>
          </li>
          <li onClick={() => handlerUsers()}>
            <Link to="/admin/users" className={clickUsers ? "Click" : ""}>
              <FaUserCog /> Quản Lý Tài Khoản
            </Link>
          </li>
          <li onClick={() => handlerReportBlog()}>
            <Link to="/admin/reportBlog" className={clickReportBlog ? "Click" : ""}>
              <FaUserCog /> Báo cáo bài viết
            </Link>
          </li>
          <li onClick={() => createAdmin()}>
            <Link
              to="/admin/adminCreate"
              className={clickCreateAdmin ? "Click" : ""}
            >
              <FaUserPlus /> Thêm quản trị viên
            </Link>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="navbar">
          <h1>
            Welcome to Admin {currentUser ? currentUser.fullName : ""}
            <Link to="/login" onClick={handleLogout}>
              Đăng xuất
            </Link>
          </h1>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
