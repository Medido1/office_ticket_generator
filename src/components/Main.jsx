import Form from "./Form";
import Ticket from "./Ticket";
import { useContext } from "react";
import {GlobalContext} from "../context/GlobalContext";


function Main() {
  const {state, changeType} = useContext(GlobalContext)
  return (
    <main className="p-4 flex gap-4 bg-gray-200">
      <Form 
        changeType = {changeType}
      />
      <Ticket
        type ={state.type}
      />
    </main>
  )
}

export default Main;