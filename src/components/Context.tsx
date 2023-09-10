import { useReducer } from 'react';
import { reducer, type State } from '../context';
import AppContext from '../context';

type Props = {
  children: JSX.Element;
};

const initialState: State = { users: [] };

function ContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
export default ContextProvider;
