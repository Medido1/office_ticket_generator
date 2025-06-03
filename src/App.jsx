import './App.css'
import Header from "./components/Header";
import Main from "./components/Main";
import Anapath from './components/Anapath';
import Cytoponction from './components/Cytoponction';
import FCV from './components/Fcv';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/Anapath" element={<Anapath />}/>
        <Route path="/Cytoponction" element={<Cytoponction />}/>
        <Route path="/FCV" element={<FCV />}/>
      </Routes>
    </Router> 
  )
}

export default App;