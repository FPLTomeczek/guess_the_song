import { SET_TOP_SCORES } from "../actions";

const profileReducer = (state, action) => {
  if (action.type === SET_TOP_SCORES) {
    if (state.topScores.length < 10) {
      return {
        ...state,
        topScores: [...state.topScores, action.payload],
        actualItemID: action.payload.id,
      };
    } else {
      const newArray = state.topScores.sort((a, b) => b.score - a.score);
      if (action.payload.score > newArray.at(-1).score) {
        newArray.pop();
        return {
          ...state,
          topScores: [...newArray, action.payload],
          actualItemID: action.payload.id,
        };
      }
      return { ...state, actualItemID: 0 };
    }
  }
  return state;
};

export default profileReducer;
