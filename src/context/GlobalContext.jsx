import {createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

export const initialState = {
  type: "",
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
      type: "CHANGE_TYPE", payload: type, })
  }

  function setNumber (number) {
    dispatch({
      type: "SET_NUMBER", payload: number})
  }

  function setName (name) {
    dispatch({
      type: "SET_NAME", payload: name})
  }

  function setTotalPrice (totalPrice) {
    dispatch({type: "SET_TOTAL_PRICE", payload: totalPrice})
  }

  function setPayedSum (payedSum) {
    dispatch ({
      type: "SET_PAYED_SUM", payload: payedSum})
  }

  function resetState() {
    dispatch({type:"RESET_STATE"})
  }

  return (
    <GlobalContext.Provider value = {{
      state,
      changeType,
      setNumber,
      setName,
      setTotalPrice,
      setPayedSum,
      resetState
    }}>
      {children}
    </GlobalContext.Provider>
  )
}