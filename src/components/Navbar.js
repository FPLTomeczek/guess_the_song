import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuthContext } from "../context/auth_context";
import { redirect } from "react-router-dom";
import logo from "../img/logo.png";
import { BsPersonFillAdd, BsPersonFillDash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { usePlayerContext } from "../context/player_context";
const Navbar = () => {
  const { token, setToken, username } = useAuthContext();
  const { soundStop } = usePlayerContext();

  const logout = () => {
    soundStop();
    setToken("");
    window.localStorage.removeItem("token");
    return <Navigate to="/login" />;
  };

  return (
    <Wrapper>
      <img src={logo} alt="logo" className="logo" />
      <div className="welcome-header">
        {token && <h2>Welcome, {username}!</h2>}
      </div>
      {!token ? (
        <Link
          to={`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}`}
        >
          <IconContext.Provider value={{ size: "50px" }}>
            <BsPersonFillAdd />
          </IconContext.Provider>
        </Link>
      ) : (
        <Link onClick={logout}>
          <IconContext.Provider value={{ size: "50px" }}>
            <BsPersonFillDash />
          </IconContext.Provider>
        </Link>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 1rem;
  display: grid;
  grid-template-columns: auto 1fr var(--image-size);
  align-items: center;
  width: 90vw;
  margin: 0 auto;
  .logo {
    width: var(--image-size);
    height: var(--image-size);
  }
  .welcome-header {
    display: flex;
    justify-content: center;
  }
`;

export default Navbar;
