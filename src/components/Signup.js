import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';


const Signup = () => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const {setLoading} = context;
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        const response = await fetch(`https://mynotebookbackend-0n7e.onrender.com/api/auth/createUser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                name:name,
                email:email,
                password:password
              }),
        });
        const json = await response.json();
        console.log(json);
        setLoading(false);
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            navigate('/');
        }
        else{
            alert(json.error);
        }
    }
  return (
    <div className="signup">
      <form className="m-5" onSubmit={handleSubmit}>
        <h2 className="mb-4">Sign up</h2>
        <div>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder='Enter Name'
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
            placeholder='Enter Email'
          />
        </div>
        <div className="mt-2 mb-4">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" required  placeholder='Enter Password'/>
        </div>
        <button type="submit" className="btn btn-primary btn-form">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup
