import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  auth: null,
  setAuth: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {}, [auth]);

  return(
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;