import React, {createContext, useState} from 'react';
import {MatchMode, ThemeContextProps} from '../types';
import useApp from '../hooks/useApp';

const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({children}: any) => {
  const [colors, setColors] = useState([
    '#ff00ff',
    '#180056',
    '#180056',
    '#180056',
    '#4400ff',
  ]);
  const [prevColors, setPrevColors] = useState<string[]>([]);
  const [mode, setMode] = useState<MatchMode>('UCL');
  const {changeMode} = useApp();

  const setMainColors = (colors: string[]) => {
    setColors(colors);
  };

  const setPrevMainColors = (colors: string[]) => {
    setPrevColors(colors);
  };

  const setNewMode = (newMode: MatchMode) => {
    setMode(newMode);
    changeMode(newMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        colors,
        prevColors,
        setMainColors,
        setPrevMainColors,
        mode,
        setNewMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
