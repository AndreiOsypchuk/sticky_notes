import React from "react";
import { InitState } from "./initState";
import { rootReducer } from "./reducer";
export const RootContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(rootReducer, InitState, () => {
    return JSON.parse(localStorage.getItem("state")) || InitState;
  });
  React.useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);
  return (
    <RootContext.Provider value={{ state, dispatch }}>
      {children}
    </RootContext.Provider>
  );
};
