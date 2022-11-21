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
    case Actions.CREATE_NOTE: {
      return { ...state, notes: [...state.notes, action.data] };
    }
    // change isInWorkspace to true
    case Actions.PIN_NOTE: {
      return state;
    }
    // change isInWorkspace to false

    case Actions.UNPIN_NOTE: {
      return state;
    }
    default: {
      return state;
    }
  }
};
