import React from "react";
import styled from "styled-components";
import { useAuthContext } from "../context/auth_context";
import logo from "../img/logo.png";
import { BsPersonFillAdd, BsPersonFillDash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { Navigate } from "react-router-dom";
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
      <nav className="nav-container">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="welcome-header">
          {token ? <h2>Welcome, {username}!</h2> : null}
        </div>
        {!token ? (
          <Link
            to={`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}`}
            className="link"
          >
            <IconContext.Provider value={{ size: "50px" }}>
              <BsPersonFillAdd data-test="login" />
            </IconContext.Provider>
          </Link>
        ) : (
          <Link onClick={logout} className="link">
            <IconContext.Provider value={{ size: "50px" }}>
              <BsPersonFillDash />
            </IconContext.Provider>
          </Link>
        )}
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .nav-container {
    padding: 0 1rem;
    display: grid;
    grid-template-columns: auto 1fr var(--image-size);
    align-items: center;
    width: 90vw;
    margin: 0 auto;
  }
  .logo {
    width: var(--image-size);
    height: var(--image-size);
  }
  .welcome-header {
    display: flex;
    justify-content: center;
  }
  .link {
    display: flex;
    justify-content: center;
  }
  @media (max-width: 700px) {
    .welcome-header {
      display: none;
    }
    .nav-container {
      grid-template-columns: auto var(--image-size);
    }
  }
`;

export default Navbar;
