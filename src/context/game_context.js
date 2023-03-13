import { createContext, useContext, useReducer, useState } from "react";
import reducer from "../reducers/game_reducer";
import {
  SET_SCORE,
  SET_ALBUM_TRACKS,
  CHECK_GAME_FINISHED,
  RESET_GAME,
} from "../actions";
import { useAuthContext } from "./auth_context";
import axios from "axios";

const GameContext = createContext();

const initialState = {
  score: 0,
  round: 0,
  max_round: 5,
  max_score: 150,
  idOfPlayedTracks: [],
  albumTracks: [],
  answers: [],
  indexOfTrack: 0,
  finished: false,
};

export const GameProvider = ({ children }) => {
  const { token } = useAuthContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [seconds, setSeconds] = useState(30);

  const setScore = (value) => {
    dispatch({ type: SET_SCORE, payload: value });
  };

  const resetGame = () => {
    dispatch({ type: RESET_GAME, payload: initialState });
  };

  const setNewRound = (data) => {
    dispatch({ type: SET_ALBUM_TRACKS, payload: data });
  };

  const checkGameFinished = (round) => {
    dispatch({ type: CHECK_GAME_FINISHED, payload: round });
  };

  const fetchAlbumTracks = async (id) => {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/albums/${id}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 50,
          },
        }
      );
      dispatch({ type: SET_ALBUM_TRACKS, payload: data.items });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        setScore,
        fetchAlbumTracks,
        setNewRound,
        checkGameFinished,
        resetGame,
        seconds,
        setSeconds,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};
