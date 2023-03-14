import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGameContext } from "../context/game_context";
import { Link } from "react-router-dom";
import { useArtistContext } from "../context/artist_context";
import styled from "styled-components";
import Loading from "../components/Loading";
import { usePlayerContext } from "../context/player_context";
import { useProfileContext } from "../context/profile_context";
import TopScores from "../components/TopScores";
import Player from "../components/Player";

const PlayerPage = () => {
  const { id } = useParams();
  const { artistID } = useArtistContext();
  const {
    score,
    setScore,
    fetchAlbumTracks,
    albumTracks,
    answers,
    indexOfTrack,
    setNewRound,
    round,
    max_round,
    checkGameFinished,
    finished,
    resetGame,
    max_score,
    images,
    name,
    setImagesAndName,
    seconds,
  } = useGameContext();

  const { setTopScores } = useProfileContext();

  const { soundStop, setTrack } = usePlayerContext();

  const [isLoaded, setIsLoaded] = useState(false);
  const [slideTop, setSlideTop] = useState(false);
  const [lastRoundSeconds, setLastRoundSeconds] = useState(false);
  const [scoreAnimationVisible, setScoreAnimationVisible] = useState(false);

  useEffect(() => {
    resetGame();
    setIsLoaded(false);
    fetchAlbumTracks(id);
    setImagesAndName(images, name);
    setIsLoaded(true);
  }, [id]);

  useEffect(() => {
    soundStop();
    if (!finished) {
      const timeout = setTimeout(() => {
        setNewRound(albumTracks);
        checkGameFinished(round);
      }, 30000);
      // set to 30000
      return () => clearTimeout(timeout);
    }
  }, [answers, finished]);

  useEffect(() => {
    if (finished) {
      setTopScores({
        src: images[1].url,
        name,
        score,
        id: new Date().valueOf(),
      });
    }
  }, [finished]);

  useEffect(() => {
    console.log(round);
    if (round !== 1 && round !== 0) {
      setSlideTop(true);
    }
  }, [answers]);

  const checkAnswer = (answer) => {
    setSlideTop(false);
    if (answer === albumTracks[indexOfTrack].name) {
      setScore(seconds);
      setScoreAnimationVisible(true);
    } else {
      setScoreAnimationVisible(false);
    }
    setNewRound(albumTracks);
    setTrack(null);
    soundStop();
    checkGameFinished(round);
    setLastRoundSeconds(seconds);
  };

  if (!isLoaded) {
    return <Loading />;
  }

  if (finished) {
    return (
      <Wrapper>
        <div className="section-center">
          <div className="finished-menu">
            {scoreAnimationVisible ? (
              <span
                className={
                  slideTop ? "score-slide-finished" : "score-not-slide"
                }
                onAnimationEnd={() => setSlideTop(false)}
              >
                +{lastRoundSeconds}
              </span>
            ) : null}

            <h2 style={{ position: "relative" }}>Your score is {score}</h2>
            <div className="finished-buttons">
              <Link to="/">
                <button className="btn" onClick={resetGame}>
                  Return to Main Menu
                </button>
              </Link>
              <Link to={`/artist/${artistID}`}>
                <button className="btn" onClick={resetGame}>
                  Return to Artist Albums
                </button>
              </Link>
            </div>
            <TopScores className="topScores" />
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <main className="section-center">
        <div className="game-container">
          <div className="game-info">
            <div className="info-container">
              <span>Song</span>
              <span>
                {round}/{max_round}
              </span>
            </div>
            {images ? (
              <img src={images[1].url} alt="album cover" />
            ) : (
              <Loading />
            )}
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
          <Player />
          <div className="answer-buttons">
            {answers.map((answer, index) => {
              return (
                <button onClick={() => checkAnswer(answer)} key={index}>
                  {answer}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @keyframes slideintop {
    1% {
      opacity: 1;
    }
    100% {
      transform: translateY(-400px);
    }
  }
  .section-center {
    display: flex;
    justify-content: center;
  }
  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .game-container,
  img {
    width: 264px;
    height: 264px;
  }
  .answer-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .answer-buttons button {
    min-height: 4rem;
    border: none;
    background-color: #38502a;
    cursor: pointer;
    border-radius: 1rem;
    opacity: 0.8;
    min-width: 20em;
    font-size: 24px;
    padding: 1rem;
    color: white;
  }
  .answer-buttons button:hover {
    opacity: 1;
  }
  .finished-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
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
  .score-slide-finished {
    position: absolute;
    opacity: 1;
    animation: 4s slideintop none;
    z-index: 1;
    color: green;
    left: 300px;
    bottom: 400px;
  }
`;
export default PlayerPage;
