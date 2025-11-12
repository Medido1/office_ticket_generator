import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import deleteIcon from "/delete.png";
import editIcon from "/editer.png"
import Form from "./Form";
import { GlobalContext } from "../context/GlobalContext";
import Ticket from "./Ticket";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import MobileCard from "./MobileCard";
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

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayData, setDisplayData] = useState([]);

  return (
    <div className="flex-grow">
      <ClientTableHeader 
        type = {type}
        searchTerm = {searchTerm}
        setSearchTerm = {setSearchTerm}
      />
      <ClientTableMain 
        data={data}
        
      />
    </div>
  )
}

export default ClientTableNew;