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
import Spinner from './components/Spinner';
import LoadingBar from "react-top-loading-bar";
import Landing from './components/Landing';
function App() {
  const context = useContext(noteContext);
  const { alert, showAlert, loading, progress, setProgress } = context;
  return (
    <>
      <Router>
        <LoadingBar
          color="#f11946"
          progress={progress}
          height={5}
          onLoaderFinished={() => setProgress(0)}
        />
        <Navbar />
        <div className="container">
          {loading && <Spinner />}
          {alert && <Alert message={alert} showAlert={showAlert} />}
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
