import { useState, useMemo, useEffect, useContext } from "react";
import {GlobalContext} from "../context/GlobalContext";
import { DataContext } from "../context/DataContext";
import safeParse from "../utilities/SafeParse";

function Form({changeType, setNumber, setName,
   setPrice, setPayedSum,resetState, state,
  handlePrint, currentClient,
  isEdit, setShowForm, setDisplayData, setPhoneNumber}) {

  const {darkMode, isMulti, setIsMulti,
    numberOfTests, setNumberOfTests,
    totalPrice, setTotalPrice
  } = useContext(GlobalContext)

  const {anapathData, cytoponctionData, fcvData, refreshData} = useContext(DataContext);
 
  const editFormClass = `fixed max-w-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`

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
    return state.type && state.fullName && state.number && state.price 
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
        fullName: state.fullName,
        date : currentDay.toLocaleDateString("fr-FR", {
          year: "numeric", month: "long", day: "numeric"
        }),
        number : state.number,
        price: state.price,
        toPay: state.price - state.payedSum,
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
          fullName: state.fullName,
          date: currentDay.toLocaleDateString("fr-FR", {
            year: "numeric", month: "long", day: "numeric"
          }),
          number :parseInt(state.number) + i,
          price : state.price,
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
      setName(currentClient.fullName);
      setNumber(currentClient.number);
      setPrice(currentClient.price);
      setPayedSum(currentClient.price - currentClient.toPay);
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
      fullName : state.fullName,
      number: state.number,
      price: state.price,
      payedSum: state.payedSum,
      toPay: state.price - state.payedSum,
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
    const currentType = e.target.value;
    changeType(currentType);
    let latestNumber;

    if (currentType === "Anapath") {
      if (anapathData.length === 0) {
        latestNumber = 0;
      } else {
        latestNumber = Math.max(...anapathData.map(client => (client.number)))
      }
    } else if (currentType === "Cytoponction") {
      if (cytoponctionData.length === 0) {
        latestNumber = 0;
      } else {
        latestNumber = Math.max(...cytoponctionData.map(client => (client.number)))
      }
    } else if (currentType === "F.C.V") {
      if (fcvData.length === 0) {
        latestNumber = 0
      } else {
        latestNumber = Math.max(...fcvData.map(client => client.number))
      }
    };
    setNumber(latestNumber + 1);
  }

  function calculateEndDate(type, currentDay = new Date()) {
    let daysLeft;
    if (type === "Anapath") {
      daysLeft = 12;
    } else if (type === "Cytoponction") {
      daysLeft = 1;
    } else if (type === "F.C.V") {
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
    return endDate;
  }

  const addClient = async() => {
    if (!isFormValid()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const {
      type, number, fullName, price,
      payedSum, phoneNumber} = state;

    const endDateObj = calculateEndDate(type);
    const token = localStorage.getItem('authToken');

    const clientData = {
      type,
      number, 
      fullName,
      price,
      payed: payedSum,
      phoneNumber,
      endDate: endDateObj
    }

    try {
      const res = await fetch('http://localhost:8000/clients/add', {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(clientData)
      })
      if (res.ok) {
        refreshData();
      }
      resetState();
    } catch (error) {
      console.error(error)
    }
  }

return (
  <form className={`${darkMode ? "text-white form_dark" : "text-black form"} 
    px-4 py-8 rounded-md sm:w-full md:w-[30%] ${isEdit ? editFormClass : ""}`}
    >
    <div className="flex gap-4 mb-4">
      <label htmlFor="type" className="w-[40%] sm:w-[27%] font-bold">
        Type d'analyses:
      </label>
      <select 
        onChange = {(e) => GetNextEnteryNumber(e)}
        id="type"
        className={`${darkMode ? "bg-black" : "bg-white"} rounded-lg`}
        value={state.type}
        disabled={isEdit}
        name="type"
      >
        <option value="">select</option>
        <option value="Anapath">Anapath</option>
        <option value="Cytoponction">Cytoponction</option>
        <option value="F.C.V">FCV</option>
      </select>
    </div>
    {isMulti && !isEdit && 
      <div className="flex gap-4 mb-4">
        <label htmlFor="numberOfTests" className="w-[40%] sm:w-[27%]">
          Nombre des tests:
        </label>
        <input 
          className={`w-[27%] p-2 rounded border-grey-300 focus:outline-none
            focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-black" : "bg-white"}`}
          type="number" name="numberOfTests" id="numberOfTests" 
          min="0" value={numberOfTests} onChange={(e) => setNumberOfTests(e.target.value)}
        />
      </div>
    }
    <div className="flex gap-4 items-center mb-4">
      <label htmlFor="number" className="w-[40%] sm:w-[27%] font-bold">
        Numero :
      </label>
      <input 
        onChange={(e) => setNumber(e.target.value)}
        className={`w-[27%] p-2 rounded-lg border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-black" : "bg-white"}`}
        type="number" 
        id="number"
        name="number"
        value={state.number} min="0"/>
    </div>
    {isMulti && !isEdit &&
      <div className="flex gap-4 items-center mb-4">
        <label htmlFor="lastNumber" className="w-[40%] sm:w-[27%]">
          A :
        </label>
      <input 
        className={`w-[27%] p-2 rounded border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-black" : "bg-white"}`}
        type="lastNumber" 
        id="lastNumber"
        readOnly
        value={lastNumber ? lastNumber : ""} min="0"/>
      </div>
      }
    <div className="flex gap-4 items-center">
      <label htmlFor="fullName" className="w-[40%] sm:w-[27%] font-bold">
        Nom :
      </label>
      <input
        onChange={(e) => setName(e.target.value)} 
        className={`w-[50%] sm:w-[40%]  p-2 rounded-lg border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-black" : "bg-white"}`}
        type="text" id="fullName" autoComplete="off" value={state.fullName} name="fullName"
      />
    </div>
    <div className="flex gap-4  items-center mt-4">
      <label htmlFor="price" className="w-[40%] sm:w-[27%] font-bold">
        Prix Total :
      </label>
      {!isMulti && 
        <select  
        onChange = {(e) => setPrice(parseFloat(e.target.value) || 0)}
        id={`${isMulti ? "totalPrice" : "price"}`}
        className={`${darkMode ? "bg-black" : "bg-white"} p-2 rounded-lg
        ${isEdit ? `w-[24%]` : "sm:w-[27%]"}`}
        value={state.price}
        name="price"
        >
          <option value="1000">1000</option>
          <option value="1500">1500</option>
          <option value="2000">2000</option>
          <option value="2500">2500</option>
          <option value="4000">4000</option>
      </select>
      }
      {isMulti && !isEdit && 
        <div>
          <input 
            className={`p-2 rounded border-grey-300 focus:outline-none
              focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-black" : "bg-white"}
              w-[27%] sm:w-[40%]`}
            value={totalPrice ? totalPrice : ""}
            readOnly
            type="totalPrice" name="totalPrice" id="totalPrice" />
        </div>
      }
    </div>
    <div className="flex gap-4 items-center mt-4">
      <label htmlFor="payedSum" className="w-[40%] sm:w-[27%] font-bold">
        Prix payée :
      </label>
      <input
        onChange={(e) => setPayedSum(parseFloat(e.target.value) || 0)} 
        className={`p-2 rounded-lg border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-black" : "bg-white"}
          ${isEdit ? `w-[24%]` : "w-[24%] sm:w-[27%]"}`}
        type="number" min="0" id="payedSum" value={state.payedSum}
        name="payed"
      />
    </div>
    {isEdit && 
      <div className="flex gap-4 items-center mt-4">
        <label htmlFor="phoneNumber" className="w-[40%] sm:w-[27%]">
          Telephone
        </label>
        <input 
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={`p-2 rounded border-grey-300 focus:outline-none w-[34%]
            focus:ring-2 focus:ring-blue-400 ${darkMode ? "bg-black" : "bg-white"}`}
          type="tel" min="0" id="phoneNumber" value={state.phoneNumber} autoComplete="off"
          name="phone_number"
        />
      </div>
    }
    <div className="flex justify-between mt-4">
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
        onClick={() => isEdit ? updateInfo() : addClient()}
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
      {!isEdit && 
        <button
          type="button"
          onClick={() => setIsMulti(prev => !prev)}
          className={buttonStyle}
        >
          Multiple
        </button>
      }
    </div>
  </form>
  )
}

export default Form;