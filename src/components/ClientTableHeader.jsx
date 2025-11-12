import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link} from "react-router-dom";

function ClientTablHeader({type, searchTerm, setSearchTerm}) {
  const {darkMode} = useContext(GlobalContext);
  return (
    <header 
      className={`flex flex-col sm:flex-row gap-4 justify-center sm:justify-between 
        items-center w-full px-4 py-6 ${
        darkMode ? "bg-blue-600" : "bg-blue-200"
    }`}>
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
  )
}

export default ClientTablHeader;