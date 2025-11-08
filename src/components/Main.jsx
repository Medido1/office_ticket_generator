import Form from "./Form";
import Ticket from "./Ticket";
import { useContext, useEffect, useState } from "react";
import {GlobalContext} from "../context/GlobalContext";

import TodaysResults from "./TodaysResults";

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
    <main className={`${darkMode ? "bg-gray-400" : "bg-gray-200"} p-4 flex-grow
      flex-col md:flex-row md:justify-center`}>
      <section className="flex flex-col sm:flex-row w-full gap-4">
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
        <TodaysResults />
      </section>
      
    </main>
  )
}

export default Main;