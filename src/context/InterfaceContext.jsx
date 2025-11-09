import { createContext, useState } from "react";

export const InterfaceContext = createContext();

export const InterfaceProvider = ({children}) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <InterfaceContext.Provider value={{showSettings, setShowSettings}}>
      {children}
    </InterfaceContext.Provider>
  )
};