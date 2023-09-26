import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const context  = useContext(noteContext);
    const {userData} = context;
    useEffect(()=>{
        
    },[location])
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
 
  return (
    <div>
            <nav className="navbar navbar-expand-lg  bg-light shadow fixed-top">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">My Notebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/About">About</Link>
                </li>
            </ul>
            
            {!localStorage.getItem('token')?<form className="d-flex" role="search">
            <Link type="button" className="btn btn-light mx-2" to="/login">Login</Link>
            <Link type="button" className="btn btn-light mx-2" to="/signup">Signup</Link>
            </form>: <div className='d-flex align-items-center'> <p style={{color:'black',margin:0}}>{userData.name && `${userData.name[0].toUpperCase()+userData.name.slice(1)}` }</p>
            <button className='btn btn-secondary mx-2' onClick={handleLogout}>Logout</button> </div>}

            </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar
