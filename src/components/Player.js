import React, { useEffect } from "react";
import { PREVIEW_TIME } from "../constants";
import { useGameContext } from "../context/game_context";
import { usePlayerContext } from "../context/player_context";
import styled from "styled-components";

const Player = () => {
  const { playerSeconds, soundPlay, soundStop, isPlaying, setPlayerSeconds } =
    usePlayerContext();
  const { albumTracks, indexOfTrack, finished, answers, seconds, setSeconds } =
    useGameContext();

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

  return (
    <Wrapper>
      <div>
        <input
          type="range"
          max="30"
          className="player-input"
          disabled
          value={PREVIEW_TIME - playerSeconds}
        />
        <div className={`timer ${seconds <= 5 ? "timer-red" : ""}`}>
          TIME LEFT: {seconds}
        </div>
      </div>
      {albumTracks[indexOfTrack] ? (
        <div className="sound-btns">
          <button
            className="btn"
            onClick={() => soundPlay(albumTracks[indexOfTrack].preview_url)}
            data-test="play-btn"
          >
            Play
          </button>
          <button
            className="btn"
            onClick={() => soundStop()}
            data-test="stop-btn"
          >
            Stop
          </button>
        </div>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background: #24b24a;
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
  .sound-btns {
    display: flex;
  }
  @media (max-width: 400px) {
    .sound-btns {
      flex-direction: column;
    }
  }
`;

export default Player;
