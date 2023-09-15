import { Dispatch, createContext } from 'react';
import { type UserType } from '../utils/schemaValidation';

export type State = {
  users: UserType[];
};

type Action =
  | {
      type: 'SET_USER';
      payload: UserType;
    }
  | {
      type: 'DELETE_USER';
      payload: number;
    }
  | {
      type: 'UPDATE_USER';
      payload: UserType;
    }
  | {
      type: 'LOAD_USERS';
      payload: UserType[];
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

    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };

    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id !== action.payload.id) return u;
          return action.payload;
        }),
      };

    case 'LOAD_USERS':
      return { ...state, users: action.payload };

    default:
      return state;
  }
};
