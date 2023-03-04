import {
  SET_ARTIST_NAME,
  SET_ARTISTS,
  SET_ARTIST_ALBUM,
  SET_ALBUM_TRACKS,
} from "../actions";

const artistReducer = (state, action) => {
  if (action.type === SET_ARTIST_NAME) {
    return { ...state, artistName: action.payload };
  }
  if (action.type === SET_ARTISTS) {
    return { ...state, artists: action.payload };
  }
  if (action.type === SET_ARTIST_ALBUM) {
    return { ...state, artistAlbums: action.payload };
  }
  if (action.type === SET_ALBUM_TRACKS) {
    return { ...state, albumTracks: action.payload };
  }
  return state;
};

export default artistReducer;
