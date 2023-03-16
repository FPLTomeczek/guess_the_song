import React from "react";
import styled from "styled-components";

const LoginPage = () => {
  return (
    <div className="section-center">
      <Wrapper>
        <h2>Guess the song as fast as you can!</h2>
        <p>
          SonGuessr is a game, where the user has to guess the song played from
          the album, which was obtained from Spotify API. For correct answers,
          the user gets points to his total score, BUT you have to be quick! The
          longer it takes to guess, the less point you get! The app is
          constantly developed, so be aware of getting new features in no time.
          Have Fun!
        </p>
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

  h2 {
    font-weight: bold;
  }
  p {
    font-size: 1.1rem;
    line-height: 1.7rem;
  }

  p:nth-of-type(1) {
    position: relative;
    left: -150%;
    animation: 2s slideinleft forwards;
  }
`;
export default LoginPage;
