import { useEffect, useState, useMemo } from "react";

function Form({changeType, setNumber, setName,
   setTotalPrice, setPayedSum,resetState, state, handlePrint}) {

  const currentDay = useMemo(() => 
    new Date().toLocaleDateString("fr-FR", {
      year: "numeric", month: "long", day: "numeric"
  }), []);
    
  const archiveData = localStorage.getItem("archiveData");

  function safeParse(data) {
    try {
      return JSON.parse(data);
    } catch {
      // If parsing fails, clear bad data and return empty array
      localStorage.removeItem("archiveData");
      return [];
    }
  }

const [data, setData] = useState(() => {
  if (!archiveData) return [];
  return safeParse(archiveData);
});

function saveInfo() {
  if (!state.type || !state.name || !state.number || !state.totalPrice) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }
  const info = {
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    type: state.type,
    name: state.name,
    date : currentDay,
    number : state.number,
    totalPrice: state.totalPrice,
    toPay: state.totalPrice - state.payedSum
  }
  const newData = [...data, info];
  setData(newData)
  localStorage.setItem("archiveData", JSON.stringify(newData))
  clearForm();
}

function clearForm() {
  changeType("");
  setNumber("");
  setName("");
  setTotalPrice("");
  setPayedSum("");
}

return (
  <form className="w-[40%] bg-blue-200 p-4">
    <div className="flex gap-4 mb-4">
      <label htmlFor="type">
        Type d'analyses:
      </label>
      <select 
        onChange = {(e) => changeType(e.target.value)}
        id="type"
        className="bg-white"
        value={state.type}
      >
        <option value="">select</option>
        <option value="Anapath">Anapath</option>
        <option value="Cytoponction">Cytoponction</option>
        <option value="F.C.V">FCV</option>
      </select>
    </div>
    <div className="flex gap-4 items-center mb-4">
      <label htmlFor="number">
        Numero :
      </label>
      <input 
        onChange={(e) => setNumber(e.target.value)}
        className="bg-white w-[25%] p-2 rounded border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400"
        type="number" 
        id="number"
        value={state.number} />
    </div>
    <div className="flex gap-4 items-center">
      <label htmlFor="name">
        Nom :
      </label>
      <input
        onChange={(e) => setName(e.target.value)} 
        className="bg-white w-[35%] p-2 rounded border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400"
        type="text" id="name" autoComplete="off" value={state.name}
      />
    </div>
    <div className="flex gap-4  items-center mt-4">
      <label htmlFor="totalPrice">
        Prix Total :
      </label>
      <select  
        onChange = {(e) => setTotalPrice(Number(e.target.value))}
        id="totalPrice"
        className="bg-white p-2"
        value={state.totalPrice}>
          <option value="2500">2500</option>
          <option value="2000">2000</option>
          <option value="1500">1500</option>
          <option value="1000">1000</option>
      </select>
    </div>
    <div className="flex gap-4 items-center mt-4">
      <label htmlFor="payedSum">
        Prix payée :
      </label>
      <input
        onChange={(e) => setPayedSum(Number(e.target.value))} 
        className="bg-white w-[35%] p-2 rounded border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400"
        type="number" id="payedSum" value={state.payedSum}
      />
    </div>
    <div className="flex justify-between">
      <button
        type="button"
        onClick={() => {
          if (!state.type || !state.name || !state.number || !state.totalPrice ||
             !state.payedSum) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
          } else {
            handlePrint()
          }
          }
        } 
        className="block mx-auto bg-white px-4 py-2 rounded-full mt-4 shadow-lg cursor-pointer
        hover:scale-125 transition delay-150">
        Print
      </button>
      <button
        type="button"
        onClick={saveInfo}
        className="block mx-auto bg-white px-4 py-2 rounded-full mt-4 shadow-lg cursor-pointer
          hover:scale-125 transition delay-150">
        Save
      </button>
      <button
        type="button"
        onClick={resetState}
        className="block mx-auto bg-white px-4 py-2 rounded-full mt-4 shadow-lg cursor-pointer
        hover:scale-125 transition delay-150">
        Reset
      </button>
    </div>
    </form>
  )
}

export default Form;