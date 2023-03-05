import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useArtistContext } from "../context/artist_context";
import { Howl } from "howler";

const PlayerPage = () => {
  const { id } = useParams();
  const { albumTracks, fetchAlbumTracks, answers, indexOfTrack } =
    useArtistContext();
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
    console.log(sound.play());
    return sound.play();
  };

  const soundStop = () => {
    return sound.stop();
  };

  const checkAnswer = (answer) => {
    if (answer === albumTracks[indexOfTrack].name) {
      const time = Math.floor(sound.seek());
      console.log(time);
      return time;
    }
  };

  return (
    <div>
      {albumTracks[indexOfTrack] && (
        <div>
          <h4>{answers[0]}</h4>
          <button
            onClick={() => soundPlay(albumTracks[indexOfTrack].preview_url)}
          >
            Play
          </button>
          <button onClick={() => soundStop()}>Stop</button>
        </div>
      )}
      <div>
        {answers.map((answer) => {
          return <button onClick={() => checkAnswer(answer)}>{answer}</button>;
        })}
      </div>
    </div>
  );
};

export default PlayerPage;
