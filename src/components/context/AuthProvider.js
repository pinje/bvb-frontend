import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  auth: null,
  saveAuth: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    id: 0,
    roles: [""],
    accessToken: ""
  });

  const saveAuth = (newAuth) => {
    setAuth(newAuth);
  }

  useEffect(() => {}, [auth]);

  return(
    <AuthContext.Provider value={{auth, saveAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;