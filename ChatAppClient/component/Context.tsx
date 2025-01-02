import React, { createContext, useState, ReactNode } from "react";

// Tạo Context với giá trị mặc định
export const AuthContext = createContext<{
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;//452
}>({
  userToken: null,
  setUserToken: () => {}, // Hàm này không làm gì, dùng cho trường hợp không có Provider
});

// Provider để bao bọc toàn bộ ứng dụng
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<string | null>(null); // Lưu trữ thông tin đăng nhập

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};
