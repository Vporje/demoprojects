import { createContext, useEffect, useReducer } from "react";
import React from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null, //when we will refresh our application, it will be not null, it will search in localstorage
  loading: false,
  error: null,
};

//create context
export const AuthContext = React.createContext(INITIAL_STATE);

//now write actions for that create reducers

const AuthReducer = (currentState, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,   
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":  //Initial state, when no user logged in
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return currentState;
  }
};

//using reducer in our context
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  //When user logged in, the user will be stored in the local storage, so even if the page is refreshed, it will be remain logged in

  //for useEffect, the dependency will be state of user, when state of user changes, useEffect will gets executed and we will update the local storage.
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])  

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        err: state.error,
        loading: state.loading,
        dispatch: dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
