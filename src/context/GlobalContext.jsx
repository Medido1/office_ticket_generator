import {createContext, useReducer, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import AppReducer from "./AppReducer";

export const initialState = {
  type: "",
  number: "",
  fullName: "",
  price: "",
  payedSum: "",
  phoneNumber: "//",
  endDate: "",
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
  /* printing stats */
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const ticketRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: `${state.fullName}`,
    contentRef: ticketRef
  })

  /* handle mulitple entries */
  const [isMulti, setIsMulti] = useState(false);
  const [numberOfTests, setNumberOfTests] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

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

  function setName (fullName) {
    dispatch({
      type: "SET_NAME", payload: fullName})
  }

  function setPrice (price) {
    dispatch({type: "SET_TOTAL_PRICE", payload: price})
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
      setPrice,
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
      setNumberOfTests,
      totalPrice,
      setTotalPrice
    }}>
      {children}
    </GlobalContext.Provider>
  )
}