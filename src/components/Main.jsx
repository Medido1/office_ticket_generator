import Form from "./Form";
import Ticket from "./Ticket";
import { useContext } from "react";
import {GlobalContext} from "../context/GlobalContext";


function Main() {
  const {state, 
    changeType, 
    setNumber, 
    setName,
    setTotalPrice,
    setPayedSum,
    resetState} = useContext(GlobalContext)
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
      />
      <Ticket
        type ={state.type}
        number = {state.number}
        name = {state.name}
        totalPrice = {state.totalPrice}
        payedSum = {state.payedSum}
      />
    </main>
  )
}

export default Main;