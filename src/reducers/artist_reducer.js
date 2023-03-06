import {
  SET_ARTIST_NAME,
  SET_ARTISTS,
  SET_ARTIST_ALBUM,
  SET_ARTIST_ID,
} from "../actions";

const artistReducer = (state, action) => {
  if (action.type === SET_ARTIST_NAME) {
    console.log("set-artist-name");
    return { ...state, artistName: action.payload };
  }
  if (action.type === SET_ARTISTS) {
    return { ...state, artists: action.payload };
  }
  if (action.type === SET_ARTIST_ID) {
    console.log("set-artist-id");
    console.log(action.payload);
    return { ...state, artistID: action.payload };
  }
  if (action.type === SET_ARTIST_ALBUM) {
    let data = action.payload;
    const albumsNames = [];
    data = data.filter((album) => {
      if (!albumsNames.includes(album.name.toLowerCase())) {
        albumsNames.push(album.name.toLowerCase());
        return album;
      }
      return null;
    });
    return {
      ...state,
      artistAlbums: data,
    };
  }
  return state;
};

export default artistReducer;
