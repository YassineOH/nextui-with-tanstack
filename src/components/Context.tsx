import { useReducer } from 'react';
import { reducer, type State } from '../utils/context';
import AppContext from '../utils/context';
import { data } from '../utils/data';

type Props = {
  children: JSX.Element;
};

const initialState: State = {
  users: data,
};

function ContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
export default ContextProvider;
