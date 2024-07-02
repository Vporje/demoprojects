import { createContext, useReducer } from "react";
import React from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    rooms: undefined,
  },
};

//create context
export const SearchContext = React.createContext(INITIAL_STATE);

//now write actions for that create reducers

const SearchReducer = (currentState, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return currentState;
  }
};

//using reducer in our context
export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch: dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
