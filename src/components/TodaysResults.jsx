import { useContext, useMemo, useState } from "react";
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

  const AnapathData = data.filter(item => item.type === "Anapath");
  const CytoponctionData = data.filter(item => item.type === "Cytoponction");
  const FCVData = data.filter(item => item.type === "F.C.V");
  return (
    <div className={`${darkMode ? "bg-blue-600 text-white" : "bg-blue-200 text-black"} 
    px-4 py-8 sm:w-[40%]`}>

    </div>
  )
}

export default TodaysResults