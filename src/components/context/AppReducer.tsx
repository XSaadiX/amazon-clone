export interface State {
  basket: [];
  user: string | null;
}

export const initialState: State = {
  basket: [],
  user: null,
};

interface SetUserAction {
  type: "SET_USER";
  user: string | null;
}

export type Action = SetUserAction;

function AppReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}

export default AppReducer;
