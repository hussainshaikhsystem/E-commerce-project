import { useState, createContext } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser ] = useState(null);
  const login = (userdata) => {
    setuser(userdata);
    localStorage.setItem("userinfo", JSON.stringify(userdata));
    localStorage.setItem("token", userdata.token)
  };
  const logout = () => {
    setuser(null);
    localStorage.removeItem("userinfo")
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
