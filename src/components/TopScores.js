import React, { useEffect } from "react";
import { useProfileContext } from "../context/profile_context";
import styled from "styled-components";

const TopScores = () => {
  const { topScores, actualItemID } = useProfileContext();

  return (
    <Wrapper>
      <div className="top-scores">
        {topScores.length > 0 ? (
          topScores
            .sort((a, b) => b.score - a.score)
            .map((score, index) => {
              return (
                <div
                  className={`${
                    actualItemID === score.id ? "active-item" : null
                  } leaderboard-item`}
                  key={index}
                >
                  <h4>{index + 1}.</h4>
                  <span>{score.name}</span>
                  <img src={score.src} alt="artist" />
                  <span>Score: {score.score}</span>
                </div>
              );
            })
        ) : (
          <h4>top scores null</h4>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @keyframes leaderboard-item-bg {
    50% {
      background-color: #3eac2f;
    }
    100% {
      background-color: #38502a;
    }
  }
  .top-scores {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .leaderboard-item {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 2fr;
    align-items: center;
    padding: 1rem;
    background-color: #38502a;
    margin-top: 1rem;
    border-radius: 0.5rem;
    width: 400px;
    opacity: 0.85;
  }
  .leaderboard-item img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .active-item {
    animation: 2s leaderboard-item-bg infinite;
  }
`;

export default TopScores;
