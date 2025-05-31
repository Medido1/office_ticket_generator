import Form from "./Form";
import Ticket from "./Ticket";
import { useContext } from "react";
import {GlobalContext} from "../context/GlobalContext";


function Main() {
  const {state, changeType, setNumber} = useContext(GlobalContext)
  return (
    <main className="p-4 flex gap-4 bg-gray-200">
      <Form 
        changeType = {changeType}
        setNumber = {setNumber}
      />
      <Ticket
        type ={state.type}
        number = {state.number}
      />
    </main>
  )
}

export default Main;