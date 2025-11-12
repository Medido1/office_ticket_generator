import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { DataContext } from "../context/DataContext";
import { deleteClient } from "../api/clientsApi";
import deleteIcon from "/delete.png";
import editIcon from "/editer.png"

function ClientTableMain({data}) {
  const {isMobile, darkMode} = useContext(GlobalContext);
  const {refreshData} = useContext(DataContext);
  const [message, setMessage] = useState("");

  // update client info
  const [showForm, setShowForm] = useState(false);
  const [currentClient, setCurrentClient] = useState({});

  const getUpdateClientForm= (id) => {
    const targetClient = data.find((client) => client.id === id);
    setCurrentClient(targetClient);
    setShowForm(true);
  };

  useEffect(() => {
    console.log(data[0])
  })
  return (
    <main className="bg-gray-200 p-4">
      {!isMobile && (
        <table className={`min-w-full border-2
          ${
            darkMode
              ? "bg-black border-blue-200 text-white"
              : "bg-white border-blue-400 text-black"
        }`}>
          <thead className={`${darkMode ? "bg-blue-600" : "bg-blue-400"}`}>
            <tr>
              <th>Date</th>
              <th>Numero</th>
              <th>Sortie</th>
              <th>Nom</th>
              <th>Prix Total</th>
              <th>Reste a payé</th>
              <th>Telephone</th>
            </tr>
          </thead>
          <tbody>
            {data.map((client) => (
              <tr key={client.id}>
                <td className="w-[18%] p-2 border text-center">
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <button
                      onClick={() => 
                        deleteClient(client.id, setMessage, refreshData)}
                    >
                       <img
                          className="w-5"
                          src={deleteIcon}
                          alt="delete icon"
                        />
                    </button>
                    <button
                      onClick={() => {
                        getUpdateClientForm(client.id)
                      }}
                    >
                      <img 
                        className="w-5"
                        src={editIcon} 
                        alt="edit icon"
                      />
                    </button>
                    <p className="order-first sm:order-none">
                      {client.createdAt.split("T")[0]}
                    </p>
                  </div>
                </td>
                <td className="p-2 border text-center text-sm sm:w-[7%] sm:text-md">
                  {client.number}
                </td>
                <td className="p-2 border text-center">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      /* checked={client.checked}
                      onChange={() => checkAsCompleted(client.id)} */
                    />
                    <span className="checkmark"></span>
                    </label>
                </td>
              </tr>
            ))}
          </tbody>
           
        </table>
      )}
    </main>
  )
}

export default ClientTableMain;