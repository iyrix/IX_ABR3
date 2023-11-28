import { createContext, useContext, useState } from "react";

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [toggleState, setToggleState] = useState(false);

  const toggle = () => {
    setToggleState((prevToggleState) => !prevToggleState);
  };

  return (
    <AppContext.Provider value={{ toggleState, toggle }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
