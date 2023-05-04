import React, { createContext } from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

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

  useEffect(() => {
    if (!token && isLoaded) {
      navigate("/login");
    }
  }, [token]);

  const fetchUserInfo = async () => {
    if (token) {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(data.display_name);
        postUser(data.id);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
      }
    }
  };

  const postUser = async (id) => {
    console.log(customAxios);
    const { data: response } = await axios
      .post("http://localhost:5000/api/v1/auth/login", {
        spotify_id: id,
      })
      .catch((err) => console.log(err));
    console.log(response);
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
