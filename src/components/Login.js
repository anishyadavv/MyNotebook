import React from "react";
import {useNavigate} from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
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
        if(json.success){
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        }
        else{
            alert(json.error);
        }
    }
  return (
    <div>
      <form className="m-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
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
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
