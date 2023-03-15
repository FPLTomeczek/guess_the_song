import React from "react";
import styled from "styled-components";
import Quotes from "../components/Quotes";

const LoginPage = () => {
  return (
    <div className="section-center">
      <Wrapper>
        <h2>Guess the song as fast as you can!</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          amet ea quam cumque ducimus maiores, sed, repudiandae, neque nam a
          accusantium eos! Corrupti culpa consequatur necessitatibus, nihil
          soluta voluptates qui accusamus fugiat totam beatae rem dolore animi
          eos sint, non quaerat aliquid id ad voluptate quasi. Odio, consequatur
          nisi facilis nihil amet doloremque, impedit exercitationem excepturi
          nulla molestiae perferendis voluptates accusantium ab architecto
          incidunt, facere dolor nesciunt.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero ad quas
          quam qui quibusdam expedita. Ex vero officiis recusandae quisquam
          facilis, accusamus ducimus provident quam omnis perspiciatis et nam
          ipsam tenetur sequi possimus error ad, laborum aut corporis dicta. Ex
          sed nam repudiandae tempore cumque qui porro.
        </p>
        <Quotes></Quotes>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;

  @keyframes slideinleft {
    100% {
      transform: translateX(150%);
    }
  }

  @keyframes slideinright {
    100% {
      transform: translateX(-150%);
    }
  }

  h2 {
    font-weight: bold;
  }
  p {
    font-size: 1.1rem;
  }

  p:nth-of-type(1) {
    position: relative;
    left: -150%;
    animation: 2s slideinleft forwards;
  }

  p:nth-of-type(2) {
    position: relative;
    right: -150%;
    animation: 2s slideinright 2s forwards;
  }
`;
export default LoginPage;
