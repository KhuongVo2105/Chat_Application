import React, { createContext, useState } from 'react';

// Tạo context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Khởi tạo state cho email
  const [emailContext, setEmailContext] = useState('');
  const [passwordContext, setPasswordContext] = useState('')
  const [usernameContext, setUsernameContext] = useState('')
  const [birthdayContext, setBirthdayContext] = useState()
  const [tokenContext, setTokenContext] = useState('')

  // Provider cung cấp emailContext và setEmailContext
  return (
    <AuthContext.Provider
      value={{
        emailContext, setEmailContext,
        passwordContext, setPasswordContext,
        usernameContext, setUsernameContext,
        birthdayContext, setBirthdayContext,
        tokenContext, setTokenContext
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};
