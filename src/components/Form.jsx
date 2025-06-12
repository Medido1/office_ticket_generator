import { useState, useMemo, useEffect } from "react";
import {GlobalContext} from "../context/GlobalContext";
import { useContext } from "react";
import safeParse from "../utilities/SafeParse";

function Form({changeType, setNumber, setName,
   setUnitPrice, setPayedSum,resetState, state,
  handlePrint, currentClient,
  isEdit, setShowForm, setDisplayData, setPhoneNumber}) {

  const {darkMode, isMulti, setIsMulti,
    numberOfTests, setNumberOfTests,
    totalPrice, setTotalPrice
  } = useContext(GlobalContext)

  /* last number in multiple entries */
  const [lastNumber, setLastNumber] = useState(0);

  useEffect(() => {
    setLastNumber((parseInt(state.number) + parseInt(numberOfTests)) - 1)
  }, [numberOfTests])

  useEffect(() => {
    setTotalPrice(parseInt(numberOfTests) * 800) /* edge case for this lab  */
  }, [numberOfTests])

  const buttonStyle = `block mx-auto px-4 py-2 rounded-full mt-4 shadow-lg cursor-pointer
    hover:scale-125 transition delay-150 ${darkMode ? "bg-black": "bg-white"}`

  const currentDay = useMemo(() => 
    new Date(), []);
    
  const archiveData = localStorage.getItem("archiveData");

  const [data, setData] = useState(() => {
    if (!archiveData) return [];
    return safeParse(archiveData);
    });

  function isFormValid() {
    return state.type && state.name && state.number && state.UnitPrice 
  }

  function saveInfo() {
    if (!isFormValid()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    let newData = [];
    /* calculate endDate */
    let daysLeft;
    if (state.type === "Anapath") {
      daysLeft = 12;
    } else if (state.type === "Cytoponction"){
      daysLeft = 1;
    } else if (state.type === "F.C.V") {
      daysLeft = 5
    }

    /* create copy to calculate new date */
    const endDate = new Date(currentDay)
    endDate.setDate(endDate.getDate() + daysLeft);
    const dayOfWeek = endDate.getDay();

    /* if the resulting day if friday skip to saturday */
    if (dayOfWeek === 5) {
      endDate.setDate(endDate.getDate() +1)
    }

    if (!isMulti) {
      const info = {
        id: crypto.randomUUID(),
        type: state.type,
        name: state.name,
        date : currentDay.toLocaleDateString("fr-FR", {
          year: "numeric", month: "long", day: "numeric"
        }),
        number : state.number,
        UnitPrice: state.UnitPrice,
        toPay: state.UnitPrice - state.payedSum,
        phoneNumber : state.phoneNumber,
        endDate: endDate.toLocaleDateString("fr-FR", {
          year: "numeric", month: "long", day:"numeric"
        }),
      }
      newData = [...data, info];
    } else {
      for (let i = 0; i < numberOfTests; i++) {
        const info = {
          id: crypto.randomUUID(),
          type: state.type,
          name: state.name,
          date: currentDay.toLocaleDateString("fr-FR", {
            year: "numeric", month: "long", day: "numeric"
          }),
          number :parseInt(state.number) + i,
          UnitPrice : state.UnitPrice,
          toPay: totalPrice - state.payedSum,
          phoneNumber: state.phoneNumber
        }
        newData.push(info);
      }
      newData = [...data, ...newData];
    }
    setData(newData)
    localStorage.setItem("archiveData", JSON.stringify(newData))
    resetState();
    setNumberOfTests("");
  }

  // When a currentClient is provided (e.g. editing an existing entry),
  // populate the form fields with their saved data

  useEffect(() => {
    if (currentClient) {
      changeType(currentClient.type)
      setName(currentClient.name);
      setNumber(currentClient.number);
      setUnitPrice(currentClient.UnitPrice);
      setPayedSum(currentClient.UnitPrice - currentClient.toPay);
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
      UnitPrice: state.UnitPrice,
      payedSum: state.payedSum,
      toPay: state.UnitPrice - state.payedSum,
      phoneNumber: state.phoneNumber
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
    {isMulti && !isEdit && 
      <div className="flex gap-4 mb-4">
        <label htmlFor="numberOfTests" className="w-[40%] sm:w-[25%]">
          Nombre des tests:
        </label>
        <input 
          className={`w-[25%] p-2 rounded border-grey-300 focus:outline-none
            focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-black" : "bg-white"}`}
          type="number" name="numberOfTests" id="numberOfTests" 
          min="0" value={numberOfTests} onChange={(e) => setNumberOfTests(e.target.value)}
        />
      </div>
    }
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
    {isMulti && !isEdit &&
      <div className="flex gap-4 items-center mb-4">
        <label htmlFor="lastNumber" className="w-[40%] sm:w-[25%]">
          A :
        </label>
      <input 
        className={`w-[25%] p-2 rounded border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-black" : "bg-white"}`}
        type="lastNumber" 
        id="lastNumber"
        readOnly
        value={lastNumber ? lastNumber : ""} min="0"/>
      </div>
      }
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
      <label htmlFor="UnitPrice" className="w-[40%] sm:w-[25%]">
        Prix Total :
      </label>
      {!isMulti && 
        <select  
        onChange = {(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
        id={`${isMulti ? "totalPrice" : "UnitPrice"}`}
        className={`${darkMode ? "bg-black" : "bg-white"} p-2 
        ${isEdit ? `w-[24%]` : "w-[25%] sm:w-[20%]"}`}
        value={state.UnitPrice}>
          <option value="2500">2500</option>
          <option value="2000">2000</option>
          <option value="1500">1500</option>
          <option value="1000">1000</option>
      </select>
      }
      {isMulti && !isEdit && 
        <div>
          <input 
            className={`p-2 rounded border-grey-300 focus:outline-none
              focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-black" : "bg-white"}
              w-[25%] sm:w-[40%]`}
            value={totalPrice ? totalPrice : ""}
            readOnly
            type="totalPrice" name="totalPrice" id="totalPrice" />
        </div>
      }
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
    {isEdit && 
      <div className="flex gap-4 items-center mt-4">
        <label htmlFor="phoneNumber" className="w-[40%] sm:w-[25%]">
          Telephone
        </label>
        <input 
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={`p-2 rounded border-grey-300 focus:outline-none w-[34%]
            focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-black" : "bg-white"}`}
          type="tel" min="0" id="phoneNumber" value={state.phoneNumber} autoComplete="off"
        />
      </div>
    }
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
      <button
        type="button"
        onClick={() => setIsMulti(prev => !prev)}
        className={`mx-auto bg-white px-4 py-2 rounded-full mt-4 shadow-lg cursor-pointer
          hover:scale-125 transition delay-150
          ${isEdit ? "hidden" : "block"}`}
        >
        Multiple
      </button>
    </div>
    </form>
  )
}

export default Form;