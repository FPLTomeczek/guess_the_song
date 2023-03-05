// import { createContext, useContext, useReducer } from "react";
// import reducer from "../reducers/game_reducer";
// import { SET_SCORE } from "../actions";

// const GameContext = createContext();

// const initialState = {
//   score: 0,
// };

// export const GameProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const setScore = (value) => {
//     dispatch({ type: SET_SCORE, payload: value });
//   };

//   return (
//     <GameContext.Provider value={{ ...state, setScore }}>
//       {children}
//     </GameContext.Provider>
//   );
// };

// export const useGameContext = () => {
//   return useContext(GameContext);
// };
