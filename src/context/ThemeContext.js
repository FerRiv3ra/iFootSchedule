import React, {createContext, useState} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [colors, setColors] = useState([
    '#ff00ff',
    '#180056',
    '#180056',
    '#180056',
    '#4400ff',
  ]);
  const [prevColors, setPrevColors] = useState([]);
  const [mode, setMode] = useState('UCL');

  const setMainColors = colors => {
    setColors(colors);
  };

  const setPrevMainColors = colors => {
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
