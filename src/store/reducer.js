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
      const newState = state;
      for (let i = 0; i < newState.notes.length; i++) {
        if (newState.notes[i].id === action.id)
          newState.notes[i].isInWorkspace = true;
      }
      return { ...state, notes: newState.notes };
    }
    // change isInWorkspace to false

    case Actions.UNPIN_NOTE: {
      const newState = state;
      for (let i = 0; i < newState.notes.length; i++) {
        if (newState.notes[i].id === action.id)
          newState.notes[i].isInWorkspace = false;
      }
      return { ...state, notes: newState.notes };
    }

    case Actions.EDIT_NOTE: {
      const newState = state;
      for (let i = 0; i < newState.notes.length; i++) {
        if (newState.notes[i].id === action.id)
          newState.notes[i].content = action.data;
      }
      return { ...state, notes: newState.notes };
    }
    case Actions.DELETE_NOTE: {
      return { ...state, notes: state.notes.filter((n) => n.id !== action.id) };
    }
    default: {
      return state;
    }
  }
};
