import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="section-center">
      <Wrapper>
        <h1>Ooops... You entered wrong page</h1>
        <Link className="btn" to="/">
          Return to home page
        </Link>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export default ErrorPage;
