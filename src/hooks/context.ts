import { useContext } from 'react';
import AppContext from '../utils/context';

export const useAppContext = () => {
  return useContext(AppContext);
};
