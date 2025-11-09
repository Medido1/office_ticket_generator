import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import {GlobalContext} from "../context/GlobalContext";
import { InterfaceContext } from "../context/InterfaceContext";
import {UserContext} from "../context/UserContext";
import { useContext } from "react";
import Archive from "./Archive";
import settingsIcon from '/setting.png';
import SettingsModal from "./SettingsModal";


function Header() {
  const {darkMode, toggleDarkMode} = useContext(GlobalContext);
  const {showSettings, setShowSettings} = useContext(InterfaceContext);
  const {user} = useContext(UserContext);
  return (
    <header className={`${darkMode ? "header_dark" : "header"} p-4 flex flex-col sm:flex-row 
      justify-between items-center gap-4 relative`}>
      <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"}
      `}>
        Ticket Generator
      </h1>
      {user && 
      <>
        <Archive />
        <div className="flex gap-2">
          <button
            onClick={toggleDarkMode}
            className={` cursor-pointer flex items-center gap-2
             rounded-full hover:bg-gray-400 ${darkMode ? "bg-white" : "bg-gray-200"}
            sm:relative px-2`}>
            <p className={`text-black`}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </p>
            {darkMode ? <CiLight className="h-10" /> : <MdDarkMode className="h-10" />}
          </button>
          <button>
            <img 
              src={settingsIcon}
              alt="settings"
              className="h-6 cursor-pointer"
              onClick={() => setShowSettings(!showSettings)}
            />
          </button>
        </div>
        <SettingsModal />
      </>}
    </header>
  )
}

export default Header;