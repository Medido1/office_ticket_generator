import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import deleteIcon from "/delete.png";
import editIcon from "/editer.png"
import Form from "./Form";
import { GlobalContext } from "../context/GlobalContext";
import Ticket from "./Ticket";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ClientTableHeader from './ClientTableHeader';
import ClientTableMain from "./ClientTableMain";

function ClientTableNew({type, data}) {
  const {
    state,
    changeType,
    setNumber,
    setName,
    setPrice,
    setPayedSum,
    resetState,
    handlePrint,
    ticketRef,
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

  /* add pagination feature */
  const itemsPerPage = 25;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsToDisplay, setClientsToDisplay] = useState([]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  useEffect(() => {
    setClientsToDisplay(data.slice(indexOfFirstItem, indexOfLastItem))
  }, [data, currentPage])

  /* display last page on mount */
  useEffect(() => {
    const lastPage = Math.ceil(data.length / itemsPerPage);
    setCurrentPage(lastPage)
  }, [])

  /* Serch logic */
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setClientsToDisplay(data.slice(indexOfFirstItem, indexOfLastItem));
    } else {
      const searchData = data.filter((client) => 
        client.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setClientsToDisplay(searchData);
      setCurrentPage(1);
    }
  }, [searchTerm]);

  /* save info to excel document */
  function exportFullDataToExcel() {
    if (!data || data.length === 0) {
      alert("No data to export.");
      return;
    }
  
    // Optional: remove unnecessary fields (like internal IDs)
    const cleanData = data.map(({ id, ...rest }) => rest);
  
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
  };

  return (
    <div className="flex-grow">
      <ClientTableHeader 
        type = {type}
        searchTerm = {searchTerm}
        setSearchTerm = {setSearchTerm}
      />
      <ClientTableMain 
        data={clientsToDisplay}
      />
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
        </div>
      </div>
    </div>
  )
}

export default ClientTableNew;