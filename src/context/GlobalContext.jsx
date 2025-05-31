import { children, createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  type: "Anapath"
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function changeType (type) {
    dispatch({
      type: "Change_type",
      payload: type, 
    })
  }
  return (
    <GlobalContext.Provider value = {{
      state,
      changeType
    }}>
      {children}
    </GlobalContext.Provider>
  )
}