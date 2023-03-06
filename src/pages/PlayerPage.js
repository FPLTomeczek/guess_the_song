import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Howl } from "howler";
import { useGameContext } from "../context/game_context";
import { PREVIEW_TIME } from "../constants";
import { Link } from "react-router-dom";
import { useArtistContext } from "../context/artist_context";

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
  const [sound, setSound] = useState([]);

  useEffect(() => {
    fetchAlbumTracks(id);
  }, [id]);

  const soundPlay = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    setSound(sound);
    return sound.play();
  };

  const soundStop = () => {
    return sound.stop();
  };

  const checkAnswer = (answer) => {
    if (answer === albumTracks[indexOfTrack].name) {
      const time = Math.floor(sound.seek());
      setScore(PREVIEW_TIME - time);
    }
    setNewRound(albumTracks);
    soundStop();
    checkGameFinished(round);
    // set new track and answers
  };

  if (finished) {
    return (
      <div>
        <h4>Your score is {score}</h4>
        <Link to="/">
          <button onClick={resetGame}>Return to Main Menu</button>
        </Link>
        <Link to={`/artist/${artistID}`}>
          <button onClick={resetGame}>Return to Artist Albums</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <img src={from[1].url} alt="album cover" />
      <h4>
        {round}/{max_round}
      </h4>
      <h3>{score}</h3>
      {albumTracks[indexOfTrack] && (
        <div>
          <h4>{albumTracks[indexOfTrack].name}</h4>
          <button
            onClick={() => soundPlay(albumTracks[indexOfTrack].preview_url)}
          >
            Play
          </button>
          <button onClick={() => soundStop()}>Stop</button>
        </div>
      )}
      <div>
        {answers.map((answer, index) => {
          return (
            <button onClick={() => checkAnswer(answer)} key={index}>
              {answer}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerPage;
