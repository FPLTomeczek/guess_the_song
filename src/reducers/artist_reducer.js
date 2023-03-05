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
    return {
      ...state,
      artistAlbums: action.payload,
    };
  }
  if (action.type === SET_ALBUM_TRACKS) {
    const data = action.payload;
    const ind = Math.floor(Math.random() * data.length);
    const fakeAnswers = new Set();
    while (fakeAnswers.size < 3) {
      const randomNumber = Math.floor(Math.random() * data.length);
      if (randomNumber !== ind) {
        fakeAnswers.add(data[randomNumber].name);
      }
    }
    const allAnswers = [data[ind].name, ...fakeAnswers];
    return {
      ...state,
      albumTracks: action.payload,
      answers: allAnswers,
      indexOfTrack: ind,
    };
  }
  return state;
};

export default artistReducer;
