import Form from "./Form";
import Ticket from "./Ticket";
import { useContext } from "react";
import {GlobalContext} from "../context/GlobalContext";


function Main() {
  const {state, changeType, setNumber, setName} = useContext(GlobalContext)
  return (
    <main className="p-4 flex gap-4 bg-gray-200">
      <Form 
        changeType = {changeType}
        setNumber = {setNumber}
        setName = {setName}
      />
      <Ticket
        type ={state.type}
        number = {state.number}
        name = {state.name}
      />
    </main>
  )
}

export default Main;