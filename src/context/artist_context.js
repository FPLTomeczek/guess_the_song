import { createContext, useReducer } from "react";
import { useContext } from "react";
import reducer from "../reducers/artist_reducer";
import {
  SET_ARTISTS,
  SET_ARTIST_NAME,
  SET_ARTIST_ALBUM,
  SET_ALBUM_TRACKS,
} from "../actions";
import axios from "axios";
import { useAuthContext } from "./auth_context";

const ArtistContext = createContext();

const initialState = {
  artistName: "",
  artists: [],
  artist: {},
  artistAlbums: [],
  albumTracks: [],
};

export const ArtistProvider = ({ children }) => {
  const { token } = useAuthContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setArtistName = (e) => {
    dispatch({ type: SET_ARTIST_NAME, payload: e.target.value });
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
          },
        }
      );
      console.log(data.items);
      dispatch({ type: SET_ARTIST_ALBUM, payload: data.items });
    } catch (error) {
      console.log(error);
    }
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
      console.log(data.items);
      dispatch({ type: SET_ALBUM_TRACKS, payload: data.items });
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
        console.log(data);
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
        fetchAlbumTracks,
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtistContext = () => {
  return useContext(ArtistContext);
};