import { useContext, useEffect, useMemo, useState } from "react";
import {GlobalContext} from "../context/GlobalContext";
import safeParse from "../utilities/SafeParse";

function TodaysResults() {
  const {darkMode} = useContext(GlobalContext)
  const currentDay = useMemo(() => 
    new Date().toLocaleDateString("fr-FR", {
      year: "numeric", month: "long", day: "numeric"
    }), []);

  const archiveData = localStorage.getItem("archiveData");

  const [data, setData] = useState(() => {
    if (!archiveData) return [];
    return safeParse(archiveData);
  });

  
 
  const anapathToday = data.filter(
    item => item.type === "Anapath" && item.endDate === currentDay
  ); 
  const CytoponctionToday = data.filter(
    item => item.type === "Cytoponction" && item.endDate === currentDay
  );
  const FCVToday = data.filter(
    item => item.type === "F.C.V" && item.endDate === currentDay
  );
    
  return (
    <div className={`${darkMode ? " text-white results_dark" : "bg-blue-200 results"} 
    px-4 py-2 sm:flex-grow rounded-lg`}>
      <h1 className="text-2xl text-center font-bold">
        Résultats {currentDay}
      </h1>
      <h2 className="text-lg sm:text-xl font-bold border-b-2
       border-black w-[30%] sm:w-[20%]">
        Anapath :
      </h2>
      <ul className="ml-2">
        {anapathToday && anapathToday.map(item => 
          <li key={item.id}>
            <p>{item.number} {item.name}</p>
          </li>
        )}
      </ul>
      <h2 className="text-lg sm:text-xl font-bold border-b-2 border-black 
      w-[45%] sm:w-[30%] mt-4">
        Cytoponction :
      </h2>
      <ul className="ml-2">
        {CytoponctionToday && CytoponctionToday.map(item => 
          <li key={item.id}>
            <p>{item.number} {item.name}</p>
          </li>
        )}
      </ul>
      <h2 className="text-lg sm:text-xl font-bold border-b-2 
      border-black w-[16%] sm:w-[10%] mt-4">
        FCV :
      </h2>
      <ul className="ml-2">
        {FCVToday && FCVToday.map(item => 
          <li key={item.id}>
            <p>{item.number} {item.name}</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default TodaysResults