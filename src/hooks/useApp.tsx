import {useContext} from 'react';
import AppContext from '../context/AppContext';

const useApp = () => {
  return useContext(AppContext);
};

export default useApp;
