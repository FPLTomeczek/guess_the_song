import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Howl } from "howler";
import { useGameContext } from "../context/game_context";
import { PREVIEW_TIME } from "../constants";
import { Link } from "react-router-dom";
import { useArtistContext } from "../context/artist_context";
import styled from "styled-components";
import Loading from "../components/Loading";

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
  const location = useLocation();
  const { from } = location.state;

  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState({});
  const [seconds, setSeconds] = useState(30);
  const [isLoaded, setIsLoaded] = useState(false);

  let sound = {};

  useEffect(() => {
    setIsLoaded(false);
    fetchAlbumTracks(id);
    setIsLoaded(true);
    // newRound();
  }, [id]);

  useEffect(() => {
    console.log("start");
    const timeout = setTimeout(() => {
      setNewRound(albumTracks);
      checkGameFinished(round);
    }, 30000);
    // set to 30000
    console.log("finish");
    return () => clearTimeout(timeout);
  }, [answers]);

  useEffect(() => {
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
  }, [answers]);

  const soundPlay = (src) => {
    if (!isPlaying) {
      setIsPlaying(true);
      sound = new Howl({
        src,
        html5: true,
        onend: () => setIsPlaying(false),
      });
      setTrack(sound);
      return sound.play();
    }
    return null;
  };

  const soundStop = () => {
    setIsPlaying(false);
    setTrack({});
    return track.stop();
  };

  const checkAnswer = (answer) => {
    if (answer === albumTracks[indexOfTrack].name) {
      const time = Math.floor(track.seek());
      setScore(PREVIEW_TIME - time);
    }
    setNewRound(albumTracks);
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
            <h3>
              Song {round}/{max_round}
            </h3>
            <img src={from[1].url} alt="album cover" />
            <h3>Score :{score}</h3>
          </div>
          {albumTracks[indexOfTrack] && (
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
          )}
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
    background-color: #193bb3;
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
