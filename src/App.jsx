import './App.css'
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import { lazy, Suspense} from 'react';
import {UserContext} from "./context/UserContext";
import { DataContext } from './context/DataContext';
import { useContext } from 'react';
import Login from "./components/Login";
import ProtectedRoute from './components/ProtectedRoute';

const ClientTableNew = lazy(() => import('./components/ClientTableNew'));

function App() {
  const {user} = useContext(UserContext);
  const {anapathData, cytoponctionData, fcvData} = useContext(DataContext);

  return (
    <Router>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <Suspense fallback={<div className='text-center text-2xl'>Loading ...</div>}>
          <Routes>
            <Route path="/" element={
              user ? <Main /> : <Login />
              }/>
            <Route path='/anapath' element={
              <ProtectedRoute>
                <ClientTableNew type="Anapath" data={anapathData}/>
              </ProtectedRoute>
              }
            />
            <Route path='/cytoponction' element={
              <ProtectedRoute>
                <ClientTableNew type="Cytoponction" data={cytoponctionData}/>
              </ProtectedRoute>
            }/>
            <Route path='/fcv' element={
              <ProtectedRoute>
                <ClientTableNew type="F.C.V" data={fcvData}/>
              </ProtectedRoute>
            }/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router> 
  )
}

export default App;