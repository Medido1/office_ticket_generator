import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [anapathData, setAnapathData] = useState([]);
  const [cytoponctionData, setCytoponctionData] = useState([]);
  const [fcvData, setFCVData] = useState([]);
  const [refresh, setRefresh] = useState(0); // trigger for refetch

  const fetchData = async (endpoint,token, setter) => {
    try {
      const res = await fetch(`http://localhost:8000/clients/${endpoint}`,{
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const data = await res.json();
      setter(data.tests);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    if (token) {
      fetchData("Anapath", token, setAnapathData);
      fetchData("Cytoponction",token, setCytoponctionData);
      fetchData("F.C.V",token, setFCVData);
    }  
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