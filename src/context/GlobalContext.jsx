import {createContext, useReducer, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import AppReducer from "./AppReducer";

export const initialState = {
  type: "",
  number: "",
  name: "",
  UnitPrice: "",
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

  /* handle mulitple entries */
  const [isMulti, setIsMulti] = useState(false);
  const [numberOfTests, setNumberOfTests] = useState("");

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

  function setUnitPrice (UnitPrice) {
    dispatch({type: "SET_TOTAL_PRICE", payload: UnitPrice})
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
      setUnitPrice,
      setPayedSum,
      resetState,
      handlePrint, 
      ticketRef,
      darkMode, 
      toggleDarkMode,
      setPhoneNumber,
      isMulti,
      setIsMulti,
      numberOfTests,
      setNumberOfTests
    }}>
      {children}
    </GlobalContext.Provider>
  )
}