import './App.css';
import React,{useContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import noteContext from './context/notes/noteContext';
import Spinner from './components/Spinner';
import LoadingBar from "react-top-loading-bar";
import Landing from './components/Landing';
import Footer from './components/Footer';
import { Toaster } from "react-hot-toast";
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
          <div>
            <Toaster />
          </div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
