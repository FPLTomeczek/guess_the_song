import { createContext, useCallback, useMemo, useReducer } from "react";
import { useContext } from "react";
import reducer from "../reducers/artist_reducer";
import {
  SET_ARTISTS,
  SET_ARTIST_NAME,
  SET_ARTIST_ALBUM,
  SET_ARTIST_ID,
} from "../actions";
import axios from "axios";
import { useAuthContext } from "./auth_context";
import debounce from "lodash.debounce";

const ArtistContext = createContext();

const initialState = {
  artistName: "",
  artists: [],
  artistID: 0,
  artistAlbums: [],
};

export const ArtistProvider = ({ children }) => {
  const { token } = useAuthContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setArtistName = (e) => {
    dispatch({ type: SET_ARTIST_NAME, payload: e.target.value });
  };

  const setArtistID = (data) => {
    dispatch({ type: SET_ARTIST_ID, payload: data });
  };

  const setArtists = (data) => {
    dispatch({ type: SET_ARTISTS, payload: data });
  };

  const fetchArtistAlbums = async (id) => {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${id}/albums`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            include_groups: "album",
            limit: 50,
          },
        }
      );
      console.log(data);
      dispatch({ type: SET_ARTIST_ALBUM, payload: data.items });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchArtists = async () => {
    if (state.artistName) {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: state.artistName,
            type: "artist",
            limit: 5,
          },
        });
        setArtists(data.artists.items);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ArtistContext.Provider
      value={{
        ...state,
        setArtistName,
        setArtists,
        fetchArtists,
        fetchArtistAlbums,
        setArtistID,
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtistContext = () => {
  return useContext(ArtistContext);
};
