import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [anapathData, setAnapathData] = useState([]);
  const [cytoponctionData, setCytoponctionData] = useState([]);
  const [fcvData, setFCVData] = useState([]);
  const [refresh, setRefresh] = useState(0); // trigger for refetch

  useEffect(() => {
    const fetchAnapath = async() => {
      try {
        const res = await fetch ("http://localhost:8000/clients/Anapath");
        const data = await res.json();
        setAnapathData(data.tests);
      } catch (error) {
        console.error(error)
      }
    }

    const fetchCytoponction = async() => {
      try {
        const res = await fetch ("http://localhost:8000/clients/Cytoponction");
        const data = await res.json();
        setCytoponctionData(data.tests);
      } catch (error) {
        console.error(error)
      }
    }

    const fetchFcvData = async() => {
      try {
        const res = await fetch ("http://localhost:8000/clients/F.C.V");
        const data = await res.json();
        setFCVData(data.tests);
      } catch (error) {
        console.error(error)
      }
    }

    fetchAnapath()
    fetchCytoponction()
    fetchFcvData()
  }, [refresh])

  useEffect(() => {
    
  }, [refresh])

  const refreshData = () => setRefresh(prev => prev + 1);

  return (
    <DataContext.Provider value = {{
      anapathData,
      cytoponctionData,
      fcvData,
      refreshData
      }}>
      {children}
    </DataContext.Provider>
  )
}