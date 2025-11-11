import { useContext } from 'react';
import {InterfaceContext} from '../context/InterfaceContext';
import { UserContext } from '../context/UserContext';
import logoutIcon from '/logout.png'
import { motion, AnimatePresence } from "framer-motion";

function SettingsModal() {
  const {showSettings, setShowSettings} = useContext(InterfaceContext);
  const {handleLogOut} = useContext(UserContext);

  const modalAnimation = {
    initial: {y:-100},
    animate: {y: 0},
    transition: { duration: 0.6, ease: "easeOut" },
    exit: {opacity: 0, transition: { duration: 0.6, ease: "easeInOut" }},
  }

  return (
    <AnimatePresence>
    {showSettings && 
        <motion.div 
        {...modalAnimation}
        className="bg-white p-4 rounded-2xl absolute top-[80%] right-[1%]">
          <div className="flex gap-2">
            <img src={logoutIcon} alt="logout" className="h-6" />
            <button 
            onClick={() => {
              handleLogOut()
              setShowSettings(false)
            }}
            className='hover:border-b-2 cursor-pointer'>
              Log out
            </button>
          </div>
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default SettingsModal;