import { createContext, useContext } from "react";
import { useState } from "react";
import { Howl } from "howler";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState(null);

  let sound = {};

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
    if (track) {
      return track.stop();
    }
  };

  return (
    <PlayerContext.Provider
      value={{ isPlaying, track, soundPlay, soundStop, setTrack }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};
