import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../assets/delete.png";

function Anapath() {
  const [fullData, setFullData] = useState([]);
  const [anapathData, setAnapathData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
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
      const filtered = fullData.filter(item => item.type === "Anapath");
      setAnapathData(filtered);
    }, [fullData]);

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
          <input type="text"
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
            {anapathData.map(client => (
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
      </main>
    </div>
  )
}

export default Anapath;