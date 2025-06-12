import { Link } from "react-router-dom";
import { FaFolderOpen } from "react-icons/fa";
import {GlobalContext} from "../context/GlobalContext";
import { useContext } from "react";

function Archive() {
  const {darkMode} = useContext(GlobalContext)
  
  const buttonStyle = `mt-4 px-8 py-2 rounded-full cursor-pointer border-black border-2
            font-bold  hover:scale-125 transition duration-100
            ${darkMode ? "bg-blue-900 text-white hover:bg-blue-600" : "bg-blue-200 hover:bg-blue-100"}`
  return (
    <div className={`sm:mt-0 flex justify-center items-center gap-4`} >
      <Link to='/anapath'>
        <button
          className={buttonStyle}>
          <FaFolderOpen className="inline-block mr-2 mb-1" />Anapath
        </button>
      </Link>
      <Link to="/cytoponction">
        <button
          className={buttonStyle}>
          <FaFolderOpen className="inline-block mr-2 mb-1" />Cytoponction
        </button>
      </Link>
      <Link to="/fcv">
        <button
          className={buttonStyle}>
          <FaFolderOpen className="inline-block mr-2 mb-1" />F.C.V
        </button>
      </Link>
    </div>
  )
}

export default Archive;