import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./userList.module.css";
import { FaLock, FaUnlock } from "react-icons/fa";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reduxStore/Store";
import { MdAdminPanelSettings } from "react-icons/md";

interface User {
  id: number;
  birthday: string;
  username: string;
  email: string;
  status: number;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [searchData, setSearchData] = useState<User[]>();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/chat-application/v1/users/alluser`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      console.log("call api succcess");
      setUsers(response.data);
      setSearchData(response.data);
      console.log(response.data);
    } catch (err) {
      console.log("lỗi");
      if (axios.isAxiosError(err)) {
        const errorMsg =
          typeof err.response?.data === "string"
            ? err.response.data
            : "Không thể lấy danh sách user. Vui lòng thử lại sau";
        setError(errorMsg);
      } else {
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = users.filter((row) => {
      return (
        row.username.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.email.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    setSearchData(newData);
  };

  const toggleLockStatus = async (username: string, isLock: boolean) => {
    setLoading(true);
    console.log("locked", username, isLock);
    try {
      await axios.post(
        `http://localhost:8080/chat-application/v1/users/lockAccount`,
        { username: username },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      if (isLock)
        Swal.fire({
          title: "Đã khóa tài khoản!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
          toast: true,
          timerProgressBar: true,
        });
      else
        Swal.fire({
          title: "Đã mở tài khoản!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
          toast: true,
          timerProgressBar: true,
        });
      fetchUsers();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMsg =
          typeof err.response?.data === "string"
            ? err.response.data
            : "Không thể cập nhật trạng thái tài khoản. Vui lòng thử lại sau";
        setError(errorMsg);
      } else {
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row: User) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Tên Tài Khoản",
      selector: (row: User) => row.username,
      sortable: true,
      width: "170px",
    },
    {
      name: "Tên Đăng Nhập",
      selector: (row: User) => row.username,
      sortable: true,
      width: "180px",
    },
    {
      name: "Email",
      selector: (row: User) => row.email,
      sortable: true,
    },
    {
      name: "Ngày sinh",
      selector: (row: User) => row.birthday,
    },
    {
      name: "Trạng thái",
      cell: (row: User) => (
        <button
          style={{ margin: "auto", cursor: "pointer" }}
          onClick={() => {
            if (row.status == 1) {
              toggleLockStatus(row.username, true);
            } else if (row.status == 0) {
              toggleLockStatus(row.username, false);
            }
          }}
        >
          {row.status === 0 ? (
            <FaLock style={{ color: "red" }} />
          ) : (
            <FaUnlock />
          )}
        </button>
      ),
      sortable: true,
      width: "150px",
    },
  ];

  return (
    <div className={styles.container}>
      <input
        type="text"
        title="Keyword trong tiêu đề và mô tả ngắn"
        onChange={handleSearch}
        placeholder="Tìm kiếm..."
        className="search-input"
        style={{
          position: "absolute",
          top: "5px",
          left: "10px",
          width: "20%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <h2>Danh Sách Người Dùng</h2>
      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.dataTable}>
        <DataTable
          columns={columns}
          data={searchData!}
          progressPending={loading}
          pagination
          highlightOnHover
          noDataComponent="Không có dữ liệu để hiển thị"
          customStyles={{
            headCells: {
              style: {
                fontSize: "17px",
                background: "#009879",
                color: "#ffffff",
                textAlign: "left",
                fontWeight: "bold",
              },
            },
            cells: {
              style: {
                borderCollapse: "collapse",
                fontSize: "15px",
                whiteSpace: "normal",
                wordWrap: "break-word",
                height: "auto",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default UserList;
