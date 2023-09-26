import React, { useContext } from "react";
import {useNavigate} from 'react-router-dom';
import noteContext from "../context/notes/noteContext";


const Login = () => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const {setLoading} = context;
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
       const email = e.target[0].value;
       const password = e.target[1].value;
       const response = await fetch(`https://mynotebookbackend-0n7e.onrender.com/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                email:email,
                password:password
              }),
        });
        const json = await response.json();
        console.log(json);
        setLoading(false);
        if(json.success){
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        }
        else{
            alert(json.error);
        }
    }

    
  return (
    <div className="login">
      {/* {loading && <Spinner/>} */}
      <h2 className="mb-3">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Password"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-form mt-2">
          Login
        </button>
      </form>
    </div>
    
  );
};

export default Login;
