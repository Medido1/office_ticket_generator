import Form from "./Form";
import Ticket from "./Ticket";
import { useContext, useEffect, useState } from "react";
import {GlobalContext} from "../context/GlobalContext";
import Archive from "./Archive";
import safeParse from "../utilities/SafeParse";


function Main() {
  const {state, 
    changeType, 
    setNumber, 
    setName,
    setUnitPrice,
    setPayedSum,
    resetState,
    handlePrint,
    ticketRef,
    darkMode,
    setPhoneNumber
    } = useContext(GlobalContext)

  const {type, number, name, UnitPrice, payedSum} = state;

  return (
    <main className={`${darkMode ? "bg-gray-400" : "bg-gray-200"} p-4  gap-4 flex-grow
      sm:flex sm:flex-col md:flex-row md:justify-center`}>
      <Form 
        changeType = {changeType}
        setNumber = {setNumber}
        setName = {setName}
        setUnitPrice = {setUnitPrice}
        setPayedSum = {setPayedSum}
        resetState = {resetState}
        state = {state}
        handlePrint = {handlePrint}
        isEdit = {false}
        setPhoneNumber = {setPhoneNumber}
      />
      <Ticket
        ref={ticketRef}
        type = {type}
        number = {number}
        name = {name}
        UnitPrice = {UnitPrice}
        payedSum = {payedSum}
      />
      <Archive />
    </main>
  )
}

export default Main;