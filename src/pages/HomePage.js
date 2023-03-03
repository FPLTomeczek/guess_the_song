import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth_context";

const HomePage = () => {
  const { token } = useAuthContext();

  //   if (!token) {
  //     console.log("nav from home to login");
  //     return <Navigate to="/login" />;
  //   }
  return <div>HomePage</div>;
};

export default HomePage;
