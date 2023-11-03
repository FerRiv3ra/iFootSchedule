import React, {createContext, useState} from 'react';
import {MatchMode} from '../types/MatchesContextProps';
import {ThemeContextProps} from '../types/ThemeContextProps';

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

  const setMainColors = (colors: string[]) => {
    setColors(colors);
  };

  const setPrevMainColors = (colors: string[]) => {
    setPrevColors(colors);
  };

  return (
    <ThemeContext.Provider
      value={{
        colors,
        prevColors,
        setMainColors,
        setPrevMainColors,
        mode,
        setMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
