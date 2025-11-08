import './App.css'
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import { lazy, Suspense } from 'react';
import {UserContext} from "./context/UserContext";
import { useContext, useEffect } from 'react';
import Login from "./components/Login";

const ClientTable = lazy(() => import('./components/ClientTable'));

function App() {
  const {user} = useContext(UserContext);

  useEffect(() => {
    console.log(user)
  });

  return (
    <Router>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <Suspense fallback={<div className='text-center text-2xl'>Loading ...</div>}>
          <Routes>
            <Route path="/" element={
              user ? <Main /> : <Login />
              }/>
            <Route path='/anapath' element={<ClientTable type="Anapath"/>}/>
            <Route path='/cytoponction' element={<ClientTable type="Cytoponction"/>}/>
            <Route path='/fcv' element={<ClientTable type="F.C.V"/>}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router> 
  )
}

export default App;