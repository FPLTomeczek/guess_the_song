import React from "react";
import styled from "styled-components";
import { useAuthContext } from "../context/auth_context";
import { redirect } from "react-router-dom";
const Navbar = () => {
  const { token, setToken } = useAuthContext();

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    return redirect("/login");
  };

  return (
    <Wrapper>
      <img src="logo" alt="logo" />
      {!token ? (
        <button>
          <a
            href={`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}`}
          >
            Login to Spotify{" "}
          </a>
        </button>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

export default Navbar;
