import { children, createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  type: "Anapath",
  number: "",
  name: "",
  totalPrice: "",
  payedSum: "",
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

  function setNumber (number) {
    dispatch({
      type: "Set_number",
      payload: number
    })
  }

  function setName (name) {
    dispatch({
      type: "Set_name",
      payload: name
    })
  }

  function setTotalPrice (totalPrice) {
    dispatch({
      type: "Set_totalPrice",
      payload: totalPrice
    })
  }

  function setPayedSum (payedSum) {
    dispatch ({
      type: "Set_payedSum",
      payload: payedSum
    })
  }

  return (
    <GlobalContext.Provider value = {{
      state,
      changeType,
      setNumber,
      setName,
      setTotalPrice,
      setPayedSum
    }}>
      {children}
    </GlobalContext.Provider>
  )
}