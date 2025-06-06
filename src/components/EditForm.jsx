import { useContext } from "react";
import {GlobalContext} from "../context/GlobalContext";

function EditForm() {
  const {state, setNumber, setName} = useContext(GlobalContext)
  return (
  <div>
    <div className="fixed inset-0 bg-black/25 z-40"></div>
    <div className="w-[300px] absolute top-[25%] left-[40%] bg-gray-200 z-40
      p-4 rounded-2xl"
    >
      <div className="flex gap-4 items-center mb-4">
        <label htmlFor="number" className="w-[30%]">
          Numero :
        </label>
        <input
          onChange={(e) => setNumber(e.target.value)}
          className="bg-white w-[50%] p-2 rounded border-grey-400 focus:outline-none
            focus:ring-2 focus:ring-blue-400"
          type="number"
          id="number"
          value={state.number} min="0"/>
      </div>
      <div className="flex gap-4 items-center">
        <label htmlFor="name" className="w-[30%]">
          Nom :
        </label>
        <input
          onChange={(e) => setName(e.target.value)} 
          className="bg-white w-[50%] p-2 rounded border-grey-400 focus:outline-none
            focus:ring-2 focus:ring-blue-400"
          type="text" id="name" autoComplete="off" value={state.name}
        />
        </div>
      </div>
  </div>
  )
}

export default EditForm;