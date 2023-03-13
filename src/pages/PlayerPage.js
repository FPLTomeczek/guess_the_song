import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGameContext } from "../context/game_context";
import { Link } from "react-router-dom";
import { useArtistContext } from "../context/artist_context";
import styled from "styled-components";
import Loading from "../components/Loading";
import { usePlayerContext } from "../context/player_context";
import { PREVIEW_TIME } from "../constants";

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
  } = useGameContext();

  const location = useLocation();
  const {
    state: { from },
  } = location;

  const {
    soundPlay,
    soundStop,
    setTrack,
    playerSeconds,
    setPlayerSeconds,
    isPlaying,
  } = usePlayerContext();

  const [seconds, setSeconds] = useState(30);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    resetGame();
    setIsLoaded(false);
    fetchAlbumTracks(id);
    setIsLoaded(true);
  }, [id]);

  useEffect(() => {
    if (!finished) {
      const timeout = setTimeout(() => {
        setNewRound(albumTracks);
        checkGameFinished(round);
      }, 300000);
      // set to 30000
      return () => clearTimeout(timeout);
    }
  }, [answers, finished]);

  useEffect(() => {
    if (!finished) {
      setSeconds(30);
      const interval = setInterval(() => {
        setSeconds((sec) => {
          return sec - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [answers, finished]);

  useEffect(() => {
    if (isPlaying) {
      setPlayerSeconds(30);
      const interval = setInterval(() => {
        console.log(isPlaying);
        setPlayerSeconds((sec) => {
          return sec - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const checkAnswer = (answer) => {
    if (answer === albumTracks[indexOfTrack].name) {
      setScore(seconds);
    }
    setNewRound(albumTracks);
    setTrack(null);
    soundStop();
    checkGameFinished(round);
  };

  if (!isLoaded) {
    return <Loading />;
  }

  if (finished) {
    return (
      <Wrapper>
        <section className="section-center">
          <div className="finished-menu">
            <h2>Your score is {score}</h2>
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
          </div>
        </section>
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
            <img src={from[1].url} alt="album cover" />
            <div className="info-container">
              <span>Score</span>
              <span>
                {score}/{max_score}
              </span>
            </div>
          </div>
          <div>
            <input
              type="range"
              max="30"
              className="player-input"
              disabled
              value={PREVIEW_TIME - playerSeconds}
            />
            <div className={`timer ${seconds <= 5 && "timer-red"}`}>
              TIME LEFT: {seconds}
            </div>
          </div>
          {albumTracks[indexOfTrack] ? (
            <div className="sound-btns">
              <button
                className="btn"
                onClick={() => soundPlay(albumTracks[indexOfTrack].preview_url)}
              >
                Play
              </button>
              <button className="btn" onClick={() => soundStop()}>
                Stop
              </button>
            </div>
          ) : null}
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
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .sound-btns {
    display: flex;
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
  }
  .player-input {
    -webkit-appearance: none;
    width: 300px;
    height: 7px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 5px;
    margin-top: 10px;
  }
  .player-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #000000;
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background: #24b24a;
    /* cursor: pointer; */
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  .timer {
    display: flex;
    justify-content: center;
    font-size: 1.8rem;
    margin-top: 0.5rem;
  }
  .timer-red {
    color: #f20d0d;
  }
`;
export default PlayerPage;
