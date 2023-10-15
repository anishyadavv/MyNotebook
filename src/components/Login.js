import React, { useContext,useState} from "react";
import {useNavigate,Link} from 'react-router-dom';
import noteContext from "../context/notes/noteContext";


const Login = () => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const [error, setError] = useState("");
    const {setProgress} = context;
    const [type, setType] = useState("password");
    const handlePass = (e) => {
      if (type === "password") {
        setType("text");
        e.target.classList.add("fa-eye");
        e.target.classList.remove("fa-eye-slash");
      } else {
        setType("password");
        e.target.classList.add("fa-eye-slash");
        e.target.classList.remove("fa-eye");
      }
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        // setLoading(true);
        setProgress(90);
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
        // setLoading(false);
        setProgress(100);
        if(json.success){
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        }
        else{
            setError(json.error);
        }
    }

    
  return (
    <div className="login">
      {/* {loading && <Spinner/>} */}
      <h2 className="mb-3">Login</h2>
      <form onSubmit={handleSubmit}>
        <p style={{ color: "red" }}>{error}</p>
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
          <div className="d-flex">
            <input
              type={type}
              className="form-control"
              required
              placeholder="Enter Password"
            />
            <span className="d-flex align-items-center">
              <i
                className="fa-solid fa-eye-slash position-absolute eye"
                onClick={handlePass}
              ></i>
            </span>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-form mt-2">
          Login
        </button>
        <p className="text-center mt-1">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
