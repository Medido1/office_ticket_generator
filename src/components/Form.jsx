import { useState, useMemo, useEffect } from "react";
import {GlobalContext} from "../context/GlobalContext";
import { useContext } from "react";
import safeParse from "../utilities/SafeParse";

function Form({changeType, setNumber, setName,
   setTotalPrice, setPayedSum,resetState, state,
  handlePrint, currentClient,
  isEdit, setShowForm, setDisplayData}) {

  const {darkMode} = useContext(GlobalContext)

  const buttonStyle = `block mx-auto px-4 py-2 rounded-full mt-4 shadow-lg cursor-pointer
    hover:scale-125 transition delay-150 ${darkMode ? "bg-black": "bg-white"}`

  const currentDay = useMemo(() => 
    new Date().toLocaleDateString("fr-FR", {
      year: "numeric", month: "long", day: "numeric"
  }), []);
    
  const archiveData = localStorage.getItem("archiveData");

  const [data, setData] = useState(() => {
    if (!archiveData) return [];
    return safeParse(archiveData);
    });

  function isFormValid() {
    return state.type && state.name && state.number && state.totalPrice 
  }

  function saveInfo() {
    if (!isFormValid()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    const info = {
      id: crypto.randomUUID(),
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
    resetState();
  }

  // When a currentClient is provided (e.g. editing an existing entry),
  // populate the form fields with their saved data

  useEffect(() => {
    if (currentClient) {
      changeType(currentClient.type)
      setName(currentClient.name);
      setNumber(currentClient.number);
      setTotalPrice(currentClient.totalPrice);
      setPayedSum(currentClient.totalPrice - currentClient.toPay);
    }
  }, [currentClient]);

  function updateInfo() {
    if (!isFormValid()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    const updatedData = data.map(client => {
      return client.id === currentClient.id ? 
      {...client, 
      type: state.type,
      name : state.name,
      number: state.number,
      totalPrice: state.totalPrice,
      payedSum: state.payedSum,
      toPay: state.totalPrice - state.payedSum
      }
      : client;
    }) 
    localStorage.setItem("archiveData", JSON.stringify(updatedData));
    setData(updatedData);
    setDisplayData(updatedData);
    setShowForm(false);
    resetState();
  }

  /* cancel editing */

  function cancelEdit(){
    setShowForm(false)
  }

  /* get last entry number and update form number to next entery */

  function GetNextEnteryNumber(e) {
    changeType(e.target.value);
    const filterd = data.filter(client => client.type === e.target.value);
    let latestNumber;
    if (filterd.length === 0) {
      latestNumber = 1;
    } else {
      latestNumber = Math.max(...filterd.map(item => (item.number)));
    }
    setNumber(latestNumber + 1);
  }

return (
  <form className={`${darkMode ? "bg-blue-600 text-white" : "bg-blue-200 text-black"} 
    px-4 py-8 ${isEdit ? `md:w-full` : "md:w-[40%]"} sm:w-full mb-2`}
    >
    <div className="flex gap-4 mb-4">
      <label htmlFor="type" className="w-[40%] sm:w-[25%]">
        Type d'analyses:
      </label>
      <select 
        onChange = {(e) => GetNextEnteryNumber(e)}
        id="type"
        className={`${darkMode ? "bg-black" : "bg-white"}`}
        value={state.type}
        disabled={isEdit}
      >
        <option value="">select</option>
        <option value="Anapath">Anapath</option>
        <option value="Cytoponction">Cytoponction</option>
        <option value="F.C.V">FCV</option>
      </select>
    </div>
    <div className="flex gap-4 items-center mb-4">
      <label htmlFor="number" className="w-[40%] sm:w-[25%]">
        Numero :
      </label>
      <input 
        onChange={(e) => setNumber(e.target.value)}
        className={`w-[25%] p-2 rounded border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-black" : "bg-white"}`}
        type="number" 
        id="number"
        value={state.number} min="0"/>
    </div>
    <div className="flex gap-4 items-center">
      <label htmlFor="name" className="w-[40%] sm:w-[25%]">
        Nom :
      </label>
      <input
        onChange={(e) => setName(e.target.value)} 
        className={`w-[50%] sm:w-[40%]  p-2 rounded border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-black" : "bg-white"}`}
        type="text" id="name" autoComplete="off" value={state.name}
      />
    </div>
    <div className="flex gap-4  items-center mt-4">
      <label htmlFor="totalPrice" className="w-[40%] sm:w-[25%]">
        Prix Total :
      </label>
      <select  
        onChange = {(e) => setTotalPrice(parseFloat(e.target.value) || 0)}
        id="totalPrice"
        className={`${darkMode ? "bg-black" : "bg-white"} p-2 
        ${isEdit ? `w-[24%]` : "w-[25%] sm:w-[20%]"}`}
        value={state.totalPrice}>
          <option value="2500">2500</option>
          <option value="2000">2000</option>
          <option value="1500">1500</option>
          <option value="1000">1000</option>
      </select>
    </div>
    <div className="flex gap-4 items-center mt-4">
      <label htmlFor="payedSum" className="w-[40%] sm:w-[25%]">
        Prix payée :
      </label>
      <input
        onChange={(e) => setPayedSum(parseFloat(e.target.value) || 0)} 
        className={`p-2 rounded border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-black" : "bg-white"}
          ${isEdit ? `w-[24%]` : "w-[25%] sm:w-[20%]"}`}
        type="number" min="0" id="payedSum" value={state.payedSum}
      />
    </div>
    <div className="flex justify-between">
      <button
        type="button"
        onClick={() => {
          if (!isFormValid()) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
          } else {
            handlePrint()
          }
          }
        } 
        className={buttonStyle}>
        Print
      </button>
      <button
        type="button"
        onClick={() => isEdit ? updateInfo() : saveInfo()}
        className={buttonStyle}>
        Save
      </button>
      <button
        type="button"
        onClick={resetState}
        className={`${buttonStyle} ${isEdit ? "hidden" : "block"}`}>
        Reset
      </button>
      <button
        type="button"
        onClick={cancelEdit}
        className={`mx-auto bg-white px-4 py-2 rounded-full mt-4 shadow-lg cursor-pointer
          hover:scale-125 transition delay-150
          ${!isEdit ? "hidden" : "block"}`}
        >
        Cancel
      </button>
    </div>
    </form>
  )
}

export default Form;