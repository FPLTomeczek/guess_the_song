import React from "react";
import quote1 from "../img/quote-1.jpg";
import quote2 from "../img/quote-2.jpg";
import styled from "styled-components";

const Quotes = () => {
  return (
    <Wrapper>
      <div className="quote">
        <h3>"Lorem ipsum dolor sit amet."</h3>
        <img src={quote1} alt="quote-1" />
      </div>

      <div className="quote">
        <img src={quote2} alt="quote-2" />
        <h3>"Lorem, ipsum dolor."</h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @keyframes fadein {
    100% {
      opacity: 1;
    }
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
  .quote {
    display: flex;
    align-items: center;
    gap: 1rem;
    opacity: 0;
    animation: 2s fadein 4s forwards;
  }
  .quote h3 {
    font-size: 2rem;
    color: #c3fc97;
    font-style: italic;
    font-family: "Cinzel Decorative", cursive;
  }
  .quote:nth-of-type(1) {
    margin-left: 10%;
  }
  .quote:nth-of-type(2) {
    margin-left: 30%;
  }
`;

export default Quotes;
