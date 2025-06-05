import './App.css'
import Header from "./components/Header";
import Main from "./components/Main";
import Anapath from './components/Anapath';
import Cytoponction from './components/Cytoponction';
import FCV from './components/Fcv';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/anapath" element={<Anapath />}/>
        <Route path="/cytoponction" element={<Cytoponction />}/>
        <Route path="/fcv" element={<FCV />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </Router> 
  )
}

export default App;