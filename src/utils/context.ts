import { Dispatch, createContext } from 'react';
import { type UserType } from '../utils/schemaValidation';

export type State = {
  users: UserType[];
};

type Action = {
  type: 'SET_USER';
  payload: UserType;
};

type ContextDef = {
  state: State;
  dispatch: Dispatch<Action>;
};

const AppContext = createContext<ContextDef | null>(null);

export default AppContext;

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, users: [action.payload, ...state.users] };
    default:
      return state;
  }
};
