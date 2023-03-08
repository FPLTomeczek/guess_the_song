import React, { createContext } from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    console.log("auth_use_effect");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [token]);

  const fetchUserInfo = async () => {
    console.log(token);
    if (token) {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(data.display_name);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isLoaded, token, setToken, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
