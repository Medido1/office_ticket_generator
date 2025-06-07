import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../assets/delete.png";
import { FaEdit } from "react-icons/fa";
import Form from "./Form";
import {GlobalContext} from "../context/GlobalContext";

function Anapath() {
  const {state, 
    changeType, 
    setNumber, 
    setName,
    setTotalPrice,
    setPayedSum,
    resetState} = useContext(GlobalContext)
    
  const [fullData, setFullData] = useState([]);
  const [anapathData, setAnapathData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayData, setDisplayData] = useState([]);

  /* edit clients info */
  const [showForm, setShowForm] = useState(false);

  const [currentClient, setCurrentClient] = useState({});

  function editClient(id) {
    const targetClient = fullData.find(item => item && item.id === id);
    setCurrentClient(targetClient)
    setShowForm(true);
  }

  /* add pagination feature */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  
  useEffect(() => {
    let data = [];
    try {
      // Attempt to get the raw string from localStorage using the key "archiveData"
      const raw = localStorage.getItem("archiveData");

      /*  If raw data exists, parse it from JSON to a JavaScript object/array
      // If not, keep data as an empty array */
      data = raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error("Corrupt archiveData:", error);
      data = [];
    }
    setFullData(data);
  }, [])

  // Update filtered data when fullData changes
  useEffect(() => {
    const filtered = fullData.filter(item => item && item.type === "Anapath");
    setAnapathData(filtered);
    setDisplayData(filtered)
    setCurrentPage(1);
  }, [fullData]);

  useEffect(() =>  {
    if (searchTerm.trim() === ""){
      setDisplayData(anapathData)
    } else {
      const filteredData = anapathData.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayData(filteredData);
    }
    setCurrentPage(1);
  }, [searchTerm, anapathData])

  function deleteClient(id) {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet enregistrement ?")) {
      const filteredFull = fullData.filter(item => item.id !== id);
      setFullData(filteredFull);
      localStorage.setItem("archiveData", JSON.stringify(filteredFull));
    }
  }

  return (
    <div>
      <header className="flex justify-between items-center w-full bg-blue-200 px-4 py-6">
        <Link to="/">
          <button className="bg-white rounded-full px-4 py-2 cursor-pointer
            hover:bg-blue-400 hover:scale-110 transition duration-150">
            Home
          </button>
        </Link>
        <h1 
          className="justify-self-center text-xl font-bold">
          Anapath
        </h1>
        <div className="flex gap-4 items-center">
          <label htmlFor="search">Search</label>
          <input 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} 
            type="text"
            className="bg-white w-[50%] p-2 rounded border-grey-300 focus:outline-none
            focus:ring-2 focus:ring-blue-400" />
        </div>
      </header>
      <main className="bg-gray-200 p-4">
        <table className="min-w-full border-2 border-blue-400 bg-white">
          <thead className="bg-blue-400">
            <tr>
              <th>
                Date
              </th>
              <th>
                Numero
              </th>
              <th>
                Nom
              </th>
              <th>
                Prix Total
              </th>
              <th>
                Reste a payé
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(client => (
              <tr key={client.id}>
                <td className="w-[20%] p-2 border text-center ">
                  <div className="flex gap-4 items-center">
                    <button 
                      onClick={() => deleteClient(client.id)}
                      className="cursor-pointer">
                      <img  
                        className="w-5"
                        src={deleteIcon} alt="delete icon" />
                    </button>
                    <button 
                      onClick={() => editClient(client.id)}
                      className="cursor-pointer">
                      <FaEdit />
                    </button>
                    <p>{client.date}</p>
                  </div>
                </td>
                <td className="p-2 border text-center w-[7%]">{client.number}</td>
                <td className="p-2 border text-center">{client.name}</td>
                <td className="p-2 border text-center w-[12%]">{client.totalPrice}DA</td>
                <td className="p-2 border text-center w-[12%]">{client.toPay}DA</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center gap-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-300 rounded hover:bg-blue-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-2 py-2">{currentPage} / {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-300 rounded hover:bg-blue-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
      {showForm && 
        <div>
          <div className="fixed inset-0 bg-black/25 z-40"></div>
          <div className="absolute top-[20%] left-[35%] bg-gray-200 z-40
              p-4 rounded-2xl">
            <Form 
              changeType = {changeType}
              setNumber = {setNumber}
              setName = {setName}
              setTotalPrice = {setTotalPrice}
              setPayedSum = {setPayedSum}
              resetState = {resetState}
              state = {state}
              width = "full"
              inputWidth="40%"
              currentClient = {currentClient}
              isEdit = {true}
              setShowForm= {setShowForm}
              setDisplayData = {setDisplayData}
          /> 
          </div>
        </div>
      }
    </div>
  )
}

export default Anapath;