import './App.css'
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import { lazy, Suspense } from 'react';

const Anapath = lazy(() => import('./components/Anapath'));
const Cytoponction = lazy(() => import('./components/Cytoponction'));
const FCV = lazy(() => import('./components/Fcv'));
const ClientTable = lazy(() => import('./components/ClientTable'));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div className='text-center text-2xl'>Loading ...</div>}>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path='/anapath' element={<ClientTable type="Anapath"/>}/>
          <Route path='/cytoponction' element={<ClientTable type="Cytoponction"/>}/>
          <Route path='/fcv' element={<ClientTable type="F.C.V"/>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Suspense>
    </Router> 
  )
}

export default App;