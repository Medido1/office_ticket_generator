import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import {GlobalContext} from "../context/GlobalContext";
import { useContext } from "react";

function Header() {
  const {darkMode, toggleDarkMode} = useContext(GlobalContext)
  return (
    <header className={`relative p-4 flex justify-center items-center w-full shadow-md
      ${darkMode ? "bg-black" : "bg-blue-300"}`}>
      <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
        Ticket Generator
      </h1>
      <button 
        onClick={toggleDarkMode}
        className={`absolute right-10 cursor-pointer flex items-center gap-2
          px-4 rounded-full hover:bg-gray-400 ${darkMode ? "bg-white" : "bg-gray-200"}`}>
        <p className={`text-black`}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </p>
        {darkMode ? <CiLight className="h-10" /> : <MdDarkMode className="h-10" />}
      </button>
    </header>
  )
}

export default Header;