import { createContext, useContext, useReducer } from "react";
import reducer from "../reducers/profile_reducer";
import { SET_TOP_SCORES } from "../actions";

const ProfileContext = createContext();

const initialState = {
  topScores: [],
  actualItemID: 0,
};

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setTopScores = (newItem) => {
    dispatch({ type: SET_TOP_SCORES, payload: newItem });
  };

  return (
    <ProfileContext.Provider value={{ ...state, setTopScores }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  return useContext(ProfileContext);
};
