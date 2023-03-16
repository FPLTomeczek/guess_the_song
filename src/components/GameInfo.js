import React, { useState, useEffect } from "react";
import { useGameContext } from "../context/game_context";
import Loading from "./Loading";
import styled from "styled-components";

const GameInfo = ({
  slideTop,
  lastRoundSeconds,
  scoreAnimationVisible,
  setSlideTop,
}) => {
  const { round, max_round, images, score, max_score } = useGameContext();

  const [shouldReorderElements, setShouldReorderElements] = useState(false);

  useEffect(() => {
    function handleResize() {
      setShouldReorderElements(window.innerWidth <= 600);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (shouldReorderElements) {
    return (
      <Wrapper>
        <div className="game-info">
          <div className="infos-container">
            <div className="info-container">
              <span>Song</span>
              <span>
                {round}/{max_round}
              </span>
            </div>
            <div className="info-container">
              <span>Score</span>
              <span>
                {score}/{max_score}
              </span>
              {scoreAnimationVisible ? (
                <span
                  className={slideTop ? `score-slide` : "score-not-slide"}
                  onAnimationEnd={() => setSlideTop(false)}
                >
                  +{lastRoundSeconds}
                </span>
              ) : null}
            </div>
          </div>
          {images ? <img src={images[1].url} alt="album cover" /> : <Loading />}
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="game-info">
        <div className="info-container">
          <span>Song</span>
          <span>
            {round}/{max_round}
          </span>
        </div>
        {images ? <img src={images[1].url} alt="album cover" /> : <Loading />}
        <div className="info-container">
          <span>Score</span>
          <span>
            {score}/{max_score}
          </span>
          {scoreAnimationVisible ? (
            <span
              className={slideTop ? `score-slide` : "score-not-slide"}
              onAnimationEnd={() => setSlideTop(false)}
            >
              +{lastRoundSeconds}
            </span>
          ) : null}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .game-info {
    display: flex;
    align-items: center;
    gap: 5rem;
    font-size: 1.5rem;
  }
  .info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.5;
    width: 10vw;
    position: relative;
  }
  .infos-container {
    display: flex;
    justify-content: space-between;
    width: 200px;
  }
  .score-slide {
    position: absolute;
    animation: 4s slideintop none;
    opacity: 0;
    color: green;
  }
  .score-not-slide {
    position: absolute;
    opacity: 0;
  }
  @media (max-width: 600px) {
    .game-info {
      flex-direction: column;
      gap: 1rem;
    }
  }
`;

export default GameInfo;
