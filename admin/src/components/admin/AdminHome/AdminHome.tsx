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
  const [clickCategory, setClickCategory] = useState(false);
  const [clickComment, setClickComment] = useState(false);
  const [clickCreateAdmin, setClickCreateAdmin] = useState(false);
  const [file, setFile] = useState<File | null>(null); // Tệp có thể null ban đầu
  const [username, setUsername] = useState<string>(''); // Tên người dùng
  const [message, setMessage] = useState<string>(''); // Thông báo

  const handleLogout = () => {
    // dispatch(logoutCurrentUser());
    // localStorage.removeItem("authToken");
  };

  // Hàm xử lý sự kiện khi người dùng chọn file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // Lấy file người dùng chọn
    if (selectedFile) {
      setFile(selectedFile); // Lưu tệp vào state
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Thêm tệp vào FormData
    formData.append("username", username); // Thêm tên người dùng vào FormData

    try {
      const response = await axios.post(
        "http://localhost:8080/chat-application/v1/users/updateAvat",
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpbnN0YWdyYW0uY29tIiwic3ViIjoicUBnbWFpbC5jb20iLCJleHAiOjE3MzU5NjQyMDQsImlhdCI6MTczNTk2MDYwNCwic2NvcGUiOiIifQ.pe0ZqTYbrlAJoGivRm2KVjfVdXJLbFAicIlNgpyvYPcbOtz5_U8fF_XE2CrCvLwDhVOqRXsmk6B1FDodtk2QpQ`, // Thêm token xác thực
            "Content-Type": "multipart/form-data", // Chỉ định loại nội dung là multipart/form-data
          },
        }
      );

      // Nếu upload thành công, hiển thị thông báo
      console.log(response.data); // In kết quả trả về từ server
    } catch (error) {
      // Nếu có lỗi, hiển thị thông báo lỗi
      console.error(error);
    }
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
  };
  const handlerBlog = () => {
    setClickDashBoard(false);
    setClickContact(false);
    setClickBlog(true);
    setClickUsers(false);
    setClickCategory(false);
    setClickComment(false);
    setClickCreateAdmin(false);
  };
  const handlerUsers = () => {
    setClickDashBoard(false);
    setClickContact(false);
    setClickBlog(false);
    setClickUsers(true);
    setClickCategory(false);
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
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="file">Upload Avatar: </label>
            <input type="file" id="file" onChange={handleFileChange} />
          </div>
          <button type="submit">Upload</button>
        </form>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
