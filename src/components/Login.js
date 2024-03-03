import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setProgress } from "../features/notes/notesSlice";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
  const handleguest = async (e) => {
    e.preventDefault();
    setEmail("panda@gmail.com");
    setPassword("panda");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setProgress(80));
    const response = await fetch(
      `https://mynotebookbackend-0n7e.onrender.com/api/auth/login`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      toast.success("Logged in successfully");
    } else {
      setError(json.error);
      toast.error(json.error);
    }
    dispatch(setProgress(100));
  };

  return (
    <div className="login">
      <h2 className="mb-3">Login</h2>
      <form onSubmit={handleSubmit}>
        <p style={{ color: "red" }}>{error}</p>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div className="d-flex">
            <input
              type={type}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        <button onClick={handleguest} className="btn btn-danger btn-form mt-2">
          Get Guest Credentials
        </button>
        <p className="text-center mt-1">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
