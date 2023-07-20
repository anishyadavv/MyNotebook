import './App.css';
import React,{useContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';

import Alert from './components/Alert';
import noteContext from './context/notes/noteContext';
function App() {
  const context = useContext(noteContext);
  const {alert,showAlert} = context;
  return (
    <>
      
      <Router>
      <Navbar/>
      <div className="container">
      {alert && <Alert message={alert} showAlert={showAlert}/>}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
        </div>
      </Router>
      
    </>
  );
}

export default App;
