import React, {createContext, useEffect, useState} from 'react';

const AppContext = createContext();

const AppProvider = ({children}) => {
  return (
    <AppContext.Provider value={{nombre: 'Fer'}}>
      {children}
    </AppContext.Provider>
  );
};

export {AppProvider};

export default AppContext;
