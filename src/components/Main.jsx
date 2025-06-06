import Form from "./Form";
import Ticket from "./Ticket";
import { useContext, useRef } from "react";
import {GlobalContext} from "../context/GlobalContext";
import { useReactToPrint } from "react-to-print";
import Archive from "./Archive";


function Main() {
  const {state, 
    changeType, 
    setNumber, 
    setName,
    setTotalPrice,
    setPayedSum,
    resetState} = useContext(GlobalContext)

  const ticketRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: `${state.name}`,
    contentRef: ticketRef
  })

  return (
    <main className="p-4 flex gap-4 bg-gray-200">
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