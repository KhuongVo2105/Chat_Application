import React, {createContext, useState} from 'react';

// Tạo context
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [tokenContext, setTokenContext] = useState('');

  // user profile
  const [idContext, setIdContext] = useState('');
  const [usernameContext, setUsernameContext] = useState('');
  const [emailContext, setEmailContext] = useState('');
  const [createdAtContext, setCreatedAtContext] = useState()
  const [birthdayContext, setBirthdayContext] = useState()
  const [privacyContext, setPrivacyContext] = useState()
  const [statusContext, setStatusContext] = useState()
  const [roleContext, setRoleContext] = useState({ roles: [] })

  // Provider cung cấp emailContext và setEmailContext
  return (
    <AuthContext.Provider
      value={{
        tokenContext, setTokenContext,
        idContext, setIdContext,
        usernameContext, setUsernameContext,
        emailContext, setEmailContext,
        createdAtContext, setCreatedAtContext,
        birthdayContext, setBirthdayContext,
        privacyContext, setPrivacyContext,
        statusContext, setStatusContext,
        roleContext, setRoleContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
