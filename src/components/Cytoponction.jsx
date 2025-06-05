import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cytoponction() {
  const [CytoponctionData, setCytoponctionData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("archiveData")) || [];
    const filterd = data.filter(item => item.type === "Cytoponction");
    setCytoponctionData(filterd);
  }, [])

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
          Cytoponction
        </h1>
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
            {CytoponctionData.map(client => (
              <tr key={client.number}>
                <td className="p-2 border text-center w-[20%]">{client.date}</td>
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

export default Cytoponction;