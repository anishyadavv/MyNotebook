import React,{useEffect} from 'react'
import noteImg from './note.png';
import { Link,useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    useEffect(() => {
      if (localStorage.getItem("token")) {
        navigate("/home");
      }
      // eslint-disable-next-line
    },[]);
  return (
    <div>
      <div className="row landing">
        <div className="col-lg-5 col-md-6 left">
          <h1>
            Unleash Your Thoughts, Anytime, Anywhare: Your Ideas, Our Notebook.
          </h1>
          <p className="mt-4">
            Streamline your thoughts with our intutive notes app. Effortlessly
            capture, organzie, and access your ideas on the go with the help of{" "}
            <strong>My Notebook</strong> application.
          </p>
          <Link to="/signup">
            <button className="btn btn-dark btn-lg mt-4">Get Started</button>
          </Link>
        </div>
        <div className="col-lg-7 col-md-6 right">
          <img src={noteImg} alt="NoteImage" className="noteimg" />
        </div>
      </div>
    </div>
  );
}

export default Landing
