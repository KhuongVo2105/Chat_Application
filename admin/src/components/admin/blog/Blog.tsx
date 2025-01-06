import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { format, parseISO } from "date-fns"; // hỗ trợ định dạng ngày tháng theo mẫu
import { FaBookOpen, FaEdit, FaOpencart, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from "../blog/Blog.module.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reduxStore/Store";
import { FaLock, FaUnlock } from "react-icons/fa";

interface Blog {
  id: number;
  userId: string;
  username: string;
  caption: string;
  createdAt: string;
  visible: string;
  // Thêm các trường khác nếu cần thiết
}

interface Category {
  id: number;
  name: string;
}

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [listCategory, setListCategory] = useState<Category[]>([]);
  const [searchData, setSearchData] = useState<Blog[]>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchBlogs = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/chat-application/v1/post/getAllForAdmin",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setBlogs(response.data);
      setSearchData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Lỗi khi tải danh sách bài viết.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.post(
  //         "https://localhost:7125/CategoryCotroller/category"
  //       );
  //       setListCategory(response.data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = blogs.filter((row) => {
      return row.caption
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setSearchData(newData);
  };

  const handleDelete = async (id: number) => {
    try {
      // Hiển thị thông báo xác nhận trước khi xóa
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn thay đổi trạng thái bài viết này?",
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có!",
        cancelButtonText: "Hủy",
      });

      if (result.isConfirmed) {
        // Gọi API để xóa bài viết
        await axios.post(`http://localhost:8080/chat-application/v1/post/changeVisible?id=${id}`);

        // Cập nhật lại danh sách bài viết sau khi xóa thành công
        // setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        // setSearchData((prevBlogs) =>
        //   prevBlogs?.filter((blog) => blog.id !== id)
        // );

        fetchBlogs();
        
        // Hiển thị thông báo thành công
        Swal.fire({
          timer: 1000,
          icon: "success",
          title: "Đã đổi!",
          text: "Bài viết đã được thay đổi trạng thái.",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      // Hiển thị thông báo lỗi
      Swal.fire("Lỗi!", "Đã xảy ra lỗi khi xóa bài viết.", "error");
    }
  };

  const columns = [
    {
      name: "#",
      selector: (row: Blog) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Tiêu đề",
      selector: (row: Blog) => row.caption,
      sortable: true,
      width: "150px",
    },
    {
      name: "Mã người tạo",
      selector: (row: Blog) => row.userId,
      sortable: true,
    },
    {
      name: "Tên người tạo",
      selector: (row: Blog) => row.username,
      sortable: true,
    },
    {
      name: "Ngày tạo",
      selector: (row: Blog) =>
        format(parseISO(row.createdAt), "dd/MM/yyyy HH:mm:ss"),
      sortable: true,
    },
    {
      name: "Trạng thái",
      cell: (row: Blog) => (row.visible ? (<FaUnlock/>) : (<FaLock/>)
      ),
    },
    {
      name: "Tác vụ",
      cell: (row: Blog) => (
        <div>
          <>
            {row.visible ? 
            (<button
              onClick={() => handleDelete(row.id)}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "22px",
              }}
              title="Ẩn bài viết"
            >
              <FaTrash style={{ color: "red" }} />
            </button>):
            (<button
              onClick={() => handleDelete(row.id)}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "22px",
              }}
              title="Mở bài viết"
            >
              <FaBookOpen style={{ color: "blue" }} />
            </button>)}
          </>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "109px",
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
      <h2 className={styles.heading}>Danh sách bài viết</h2>
      {loading && <p style={{ textAlign: "center" }}>Đang tải...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <div className={styles.dataTable}>
          {/* <DataTable columns={columns} data={blogs} pagination /> */}
          <DataTable
            columns={columns}
            data={searchData!}
            pagination
            highlightOnHover
            noDataComponent="Không có dữ liệu !"
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
      )}
    </div>
  );
};

export default Blog;
