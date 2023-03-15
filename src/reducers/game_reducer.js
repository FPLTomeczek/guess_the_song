import {
  SET_SCORE,
  SET_ALBUM_TRACKS,
  CHECK_GAME_FINISHED,
  RESET_GAME,
  SET_IMAGES_AND_NAME,
} from "../actions";
import shuffleArray from "../utils";

const gameReducer = (state, action) => {
  if (action.type === SET_SCORE) {
    return { ...state, score: state.score + action.payload };
  }
  if (action.type === RESET_GAME) {
    const initialState = action.payload;
    return initialState;
  }
  if (action.type === CHECK_GAME_FINISHED) {
    const round = action.payload;
    if (round >= state.max_round) {
      return { ...state, finished: true };
    }
    return { ...state };
  }
  if (action.type === SET_ALBUM_TRACKS) {
    const data = action.payload;

    let ind = Math.floor(Math.random() * data.length);
    while (state.idOfPlayedTracks.includes(ind)) {
      ind = Math.floor(Math.random() * data.length);
    }

    const fakeAnswers = new Set();
    while (fakeAnswers.size < 3) {
      const randomNumber = Math.floor(Math.random() * data.length);
      if (
        randomNumber !== ind &&
        !state.idOfPlayedTracks.includes(randomNumber)
      ) {
        fakeAnswers.add(data[randomNumber].name);
      }
    }

    const allAnswers = [data[ind].name, ...fakeAnswers];
    const shuffledAnswers = shuffleArray([...allAnswers]);

    return {
      ...state,
      albumTracks: data,
      answers: shuffledAnswers,
      indexOfTrack: ind,
      idOfPlayedTracks: [...state.idOfPlayedTracks, ind],
      round: state.round + 1,
      preview_url: data[ind].preview_url,
    };
  }
  if (action.type === SET_IMAGES_AND_NAME) {
    console.log(action.payload.images);
    return {
      ...state,
      images: action.payload.images,
      name: action.payload.name,
    };
  }
};

export default gameReducer;
