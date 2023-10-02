import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Signup = () => {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const context = useContext(noteContext);
  const { setLoading } = context;
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const response = await fetch(
      `https://mynotebookbackend-0n7e.onrender.com/api/auth/createUser`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    setLoading(false);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      setError(json.error);
    }
  };
  return (
    <div className="signup">
      <form className="m-5" onSubmit={handleSubmit}>
        <h2 className="mb-4">Sign up</h2>
        <p style={{color: "red"}}>{error}</p>
        <div>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
          />
        </div>
        <div className="mt-2">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            required
            placeholder="Enter Email"
          />
        </div>
        <div className=" mt-2 mb-3">
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
              <i className="fa-solid fa-eye-slash position-absolute eye" onClick={handlePass}></i>
            </span>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-form">
          Signup
        </button>
        <p className="text-center mt-1">
          Already have an account? <Link to="/login">Login</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Signup;
