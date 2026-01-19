import React, { useState, useEffect } from "react";

const AuthContext = React.createContext();

 export const AuthProvider = (props) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("DinXUSer"))||"");
  const [islogin, setIslogin] = useState(!!user);

  useEffect(() => {
    setIslogin(!!user);
  }, [user]);

  const value = [user, setUser, islogin, setIslogin];

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useAuth(AuthContext);
};
