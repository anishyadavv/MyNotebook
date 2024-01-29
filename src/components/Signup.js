import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import toast from "react-hot-toast";

const Signup = () => {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(noteContext);
  const { setProgress } = context;
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

  const handlePasswordChange = (e) => {
    let password = e.target.value;
    let letter = document.getElementById("letter");
    let capital = document.getElementById("capital");
    let number = document.getElementById("number");
    let length = document.getElementById("length");

    let lowerCaseLetter = /[a-z]/g;
    let upperCaseLetter = /[A-Z]/g;
    let numbers = /[0-9]/g;

    document.getElementsByClassName("passwordMatch")[0].classList.remove("d-none");

    setPassword(password);
    if (password.match(lowerCaseLetter)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.add("invalid");
      letter.classList.remove("valid");
    }

    if (password.match(upperCaseLetter)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.add("invalid");
      capital.classList.remove("valid");
    }

    if (password.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.add("invalid");
      length.classList.remove("valid");
    }

    if (password.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.add("invalid");
      number.classList.remove("valid");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(90);
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
    setProgress(100);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      toast.success("Sign up successfull");
    } else {
      setError(json.error);
    }
  };
  return (
    <div className="signup">
      <form className="m-5" onSubmit={handleSubmit}>
        <h2 className="mb-4">Sign up</h2>
        <p style={{ color: "red" }}>{error}</p>
        <div>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
              onChange={handlePasswordChange}
              value={password}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
            <span className="d-flex align-items-center">
              <i
                className="fa-solid fa-eye-slash position-absolute eye"
                onClick={handlePass}
              ></i>
            </span>
          </div>
          <div className="d-none passwordMatch mt-2">
            <p>Password must contain the following:</p>
            <p id="letter" className="invalid">
              A <b>lowercase</b> letter
            </p>
            <p id="capital" className="invalid">
              A <b>capital(upper case)</b> letter
            </p>
            <p id="number" className="invalid">
              A <b>number</b>
            </p>
            <p id="length" className="invalid">
              Minimum <b>8 characters</b>
            </p>
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
