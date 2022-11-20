import { InitState } from "./initState";
import { Actions } from "./actions";
export const rootReducer = (state = InitState, action) => {
  switch (action.type) {
    case Actions.LOG_IN: {
      return { ...state, loggedIn: true };
    }
    case Actions.LOG_OUT: {
      return { ...state, loggedIn: false };
    }
    default: {
      return state;
    }
  }
};
