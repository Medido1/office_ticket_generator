import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import deleteIcon from "../assets/delete.png";
import { FaEdit } from "react-icons/fa";
import Form from "./Form";
import { GlobalContext } from "../context/GlobalContext";
import Ticket from "./Ticket";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import MobileCard from "./MobileCard";

function ClientTable({ type }) {
  const {
    state,
    changeType,
    setNumber,
    setName,
    setUnitPrice,
    setPayedSum,
    resetState,
    handlePrint,
    ticketRef,
    darkMode,
    setPhoneNumber,
  } = useContext(GlobalContext);

  /* different design for mobile view */
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* to navigate bewteen different pages */
  const location = useLocation();

  const [fullData, setFullData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayData, setDisplayData] = useState([]);

  /* edit clients info */
  const [showForm, setShowForm] = useState(false);
  const [currentClient, setCurrentClient] = useState({});

  function editClient(id) {
    const targetClient = fullData.find((item) => item && item.id === id);
    setCurrentClient(targetClient);
    setShowForm(true);
  }

  /* add pagination feature */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 10 : 25;
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(displayData.slice(indexOfFirstItem, indexOfLastItem));
  }, [displayData, currentPage]);

  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  /* start display from last page */
  useEffect(() => {
    if (displayData.length === 0 || searchTerm !== "") return;
    const lastPage = Math.ceil(displayData.length / itemsPerPage);
    setCurrentPage(lastPage);
  }, [displayData]);

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
  }, [showForm, location]);

  // Update filtered data when fullData changes
  useEffect(() => {
    const filtered = fullData.filter((item) => item && item.type === type);
    setFilteredData(filtered);
    setDisplayData(filtered);
  }, [fullData]);

  /* show search results */
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setDisplayData(filteredData);
    } else {
      const searchData = filteredData.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayData(searchData);
      setCurrentPage(1);
    }
  }, [searchTerm]);

  function deleteClient(id) {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet enregistrement ?")
    ) {
      const filteredFull = fullData.filter((item) => item.id !== id);
      setFullData(filteredFull);
      localStorage.setItem("archiveData", JSON.stringify(filteredFull));
    }
  }

  /* save info to excel document */
  function exportFullDataToExcel() {
    if (!fullData || fullData.length === 0) {
      alert("No data to export.");
      return;
    }

    // Optional: remove unnecessary fields (like internal IDs)
    const cleanData = fullData.map(({ id, ...rest }) => rest);

    const worksheet = XLSX.utils.json_to_sheet(cleanData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FullData");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(
      fileData,
      `archive_fullData_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  }

  /* set checked results */
  function checkAsCompleted(id) {
    const updatedData = fullData.map((client) => {
      return client.id === id
        ? { ...client, checked: !client.checked }
        : client;
    });
    localStorage.setItem("archiveData", JSON.stringify(updatedData));
    setFullData(updatedData);
  }

  /* import data */
  function handleImportExcel(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      /* export removes ID's so generate new one when importing */
      const jsonData = XLSX.utils.sheet_to_json(worksheet).map((item, i) => ({
        id: crypto.randomUUID(),
        ...item,
      }));

      // Optional: validate structure
      if (!jsonData[0]?.name || !jsonData[0]?.UnitPrice) {
        alert("Invalid file format.");
        return;
      }

      // Save to localStorage and refresh display
      localStorage.setItem("archiveData", JSON.stringify(jsonData));
      setFullData(jsonData);
      alert("Data imported successfully!");
    };

    reader.readAsArrayBuffer(file);
  }

  return (
    <div className="flex-grow">
      <header
        className={`flex flex-col sm:flex-row gap-4 justify-center sm:justify-between 
        items-center w-full px-4 py-6 ${
          darkMode ? "bg-blue-600" : "bg-blue-200"
        }`}
      >
        <Link to="/">
          <button
            className={` rounded-full px-4 py-2 cursor-pointer
            hover:bg-blue-400 hover:scale-110 transition duration-150
            ${darkMode ? "bg-blue-950 text-white" : "bg-white"}`}
          >
            Home
          </button>
        </Link>
        <h1
          className={`order-first sm:order-none text-2xl font-bold 
          ${darkMode ? "text-white" : "text-black"}`}
        >
          {type}
        </h1>
        <div>
          <label
            className={`${darkMode ? "text-white" : "text-black"}`}
            htmlFor="search"
          ></label>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className={`p-2 w-full sm:w-[60%] rounded border-grey-300 focus:outline-none
            focus:ring-2 focus:ring-blue-400 ${
              darkMode ? "bg-blue-400" : "bg-white"
            }`}
            placeholder="Search"
          />
        </div>
      </header>
      <main className="bg-gray-200 p-4">
        {!isMobile && (
          <table
            className={`min-w-full border-2
          ${
            darkMode
              ? "bg-black border-blue-200 text-white"
              : "bg-white border-blue-400 text-black"
          }`}
          >
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
              {currentItems.map((client) => (
                <tr key={client.id}>
                  <td className="w-[20%] p-2 border text-center ">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <button
                        onClick={() => deleteClient(client.id)}
                        className="cursor-pointer"
                      >
                        <img
                          className="w-5"
                          src={deleteIcon}
                          alt="delete icon"
                        />
                      </button>
                      <button
                        onClick={() => editClient(client.id)}
                        className="cursor-pointer"
                      >
                        <FaEdit />
                      </button>
                      <p className="order-first sm:order-none">{client.date}</p>
                    </div>
                  </td>
                  <td className="p-2 border text-center text-sm sm:w-[7%] sm:text-md">
                    {client.number}
                  </td>
                  <td className="p-2 border text-center">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={client.checked}
                        onChange={() => checkAsCompleted(client.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                  <td className="p-2 border text-center">{client.name}</td>
                  <td className="p-2 border text-center w-[12%]">
                    {client.UnitPrice}DA
                  </td>
                  <td
                    className={`${
                      client.toPay === 0 ? "bg-green-400" : "bg-red-400"
                    }
                  p-2 border text-center w-[12%]`}
                  >
                    {client.toPay}DA
                  </td>
                  <td className="p-2 border">{client.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {isMobile && (
          <div className="flex flex-col items-center ">
            {currentItems.map((item) => (
              <MobileCard key={item.id} client={item} />
            ))}
          </div>
        )}
        <div className="mt-4 relative flex justify-center items-center gap-2 pb-12 sm:pb-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-300 rounded hover:bg-blue-400 disabled:opacity-50
            cursor-pointer"
          >
            Previous
          </button>
          <span className="px-2 py-2">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-300 rounded hover:bg-blue-400 disabled:opacity-50
              cursor-pointer"
          >
            Next
          </button>
          <div className="absolute right-20 sm:right-0 bottom-0 flex items-center gap-4">
            <button
              onClick={exportFullDataToExcel}
              className=" bg-blue-300 rounded px-4 py-2
              hover:bg-blue-400 disabled:opacity-50 cursor-pointer"
            >
              Export To Excel
            </button>
            <div
              className=" bg-blue-300 rounded px-4 py-2
              hover:bg-blue-400 disabled:opacity-50"
            >
              <label htmlFor="import" className="cursor-pointer">
                Import
              </label>
              <input
                type="file"
                id="import"
                accept=".xlsx, .xls"
                style={{ display: "none" }}
                onChange={handleImportExcel}
              />
            </div>
          </div>
        </div>
      </main>
      {showForm && (
        <div>
          <div className="fixed inset-0 bg-black/25 z-40"></div>
          <div
            className="absolute top-[10%] left-[35%]  z-40
              p-4 rounded-2xl"
          >
            <Form
              changeType={changeType}
              setNumber={setNumber}
              setName={setName}
              setUnitPrice={setUnitPrice}
              setPayedSum={setPayedSum}
              resetState={resetState}
              state={state}
              width="full"
              inputWidth="40%"
              currentClient={currentClient}
              isEdit={true}
              setShowForm={setShowForm}
              setDisplayData={setDisplayData}
              handlePrint={handlePrint}
              setPhoneNumber={setPhoneNumber}
            />
          </div>
          <div className="hidden">
            <Ticket
              className="hidden"
              ref={ticketRef}
              type={state.type}
              number={state.number}
              name={state.name}
              UnitPrice={state.UnitPrice}
              payedSum={state.payedSum}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientTable;
