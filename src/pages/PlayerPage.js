import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Howl } from "howler";
import { useGameContext } from "../context/game_context";
import { Link } from "react-router-dom";
import { useArtistContext } from "../context/artist_context";
import styled from "styled-components";
import Loading from "../components/Loading";
import { usePlayerContext } from "../context/player_context";

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
  } = useGameContext();

  const { soundPlay, soundStop, setTrack } = usePlayerContext();

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
      console.log("start");
      const timeout = setTimeout(() => {
        setNewRound(albumTracks);
        checkGameFinished(round);
      }, 30000);
      // set to 30000
      console.log("finish");
      return () => clearTimeout(timeout);
    }
  }, [answers, finished]);

  useEffect(() => {
    if (!finished) {
      console.log("start interval");
      setSeconds(30);
      const interval = setInterval(() => {
        setSeconds((sec) => {
          console.log(sec);
          return sec - 1;
        });
      }, 1000);
      console.log("finish interval");
      return () => clearInterval(interval);
    }
  }, [answers, finished]);

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
            <span>
              Song {round}/{max_round}
            </span>
            <img src="src" alt="album cover" />
            <span>Score :{score}</span>
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
  }
`;
export default PlayerPage;
