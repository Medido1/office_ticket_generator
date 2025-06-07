import Form from "./Form";
import Ticket from "./Ticket";
import { useContext, useRef } from "react";
import {GlobalContext} from "../context/GlobalContext";
import Archive from "./Archive";


function Main() {
  const {state, 
    changeType, 
    setNumber, 
    setName,
    setTotalPrice,
    setPayedSum,
    resetState,
    handlePrint,
    ticketRef} = useContext(GlobalContext)

  return (
    <main className="p-4 flex gap-4 bg-gray-200 flex-grow">
      <Form 
        changeType = {changeType}
        setNumber = {setNumber}
        setName = {setName}
        setTotalPrice = {setTotalPrice}
        setPayedSum = {setPayedSum}
        resetState = {resetState}
        state = {state}
        handlePrint = {handlePrint}
        fullWidth = "40%"
        inputWidth = "20%"
      />
      <Ticket
        ref={ticketRef}
        type ={state.type}
        number = {state.number}
        name = {state.name}
        totalPrice = {state.totalPrice}
        payedSum = {state.payedSum}
      />
      <Archive />
    </main>
  )
}

export default Main;