import {createContext, useReducer, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import AppReducer from "./AppReducer";

export const initialState = {
  type: "",
  number: "",
  name: "",
  totalPrice: "",
  payedSum: "",
  phoneNumber: "//",
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
  /* printing stats */
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const ticketRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: `${state.name}`,
    contentRef: ticketRef
  })

  /* dark mode */
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev) 
  }


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

  function setPhoneNumber(phoneNumber) {
    dispatch({type: "SET_PHONE_NUMBER", payload: phoneNumber})
  }

  return (
    <GlobalContext.Provider value = {{
      state,
      changeType,
      setNumber,
      setName,
      setTotalPrice,
      setPayedSum,
      resetState,
      handlePrint, 
      ticketRef,
      darkMode, 
      toggleDarkMode,
      setPhoneNumber
    }}>
      {children}
    </GlobalContext.Provider>
  )
}