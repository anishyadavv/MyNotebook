import React from "react";

const About = () => {
  return (
    <div className="container-about">
      <h4>
        <b>Take notes anywhere. Find information faster.</b>
      </h4>
      <h4 className="mt-5">
        <b>Store and access your notes easily</b>
      </h4>
      <div className="row">
        <div className="card card-about col-5 col-md d-flex align-items-center justify-content-around">
          <i className="fa-solid fa-upload"></i>
          <b>Store</b>
        </div>
        <div className="card card-about col-5 col-md d-flex align-items-center justify-content-around">
          <i className="fa-solid fa-pen-to-square"></i>
          <b>Update</b>
        </div>
        <div className="card card-about col-5 col-md d-flex align-items-center justify-content-around">
          <i className="fa-solid fa-trash"></i>
          <b>Delete</b>
        </div>
        <div className="card card-about col-5  col-md d-flex align-items-center justify-content-around">
          <i className="fa-solid fa-magnifying-glass"></i>
          <b>Search</b>
        </div>
      </div>

      <div>
        <h4>
          <b>Contact</b>
        </h4>
        <div className="contacts">
          <a href="mailto:anishyadav7853@gmail.com">
            <div className="p-3 border mb-2">
              <i className="fa-solid fa-envelope me-2"></i>
              anishyadav7853@gmail.com
            </div>
          </a>
          <a href="https://twitter.com/AnishYadav32381">
            <div className="p-3 border mb-2">
              <i className="fa-brands fa-square-x-twitter me-2"></i>
              @AnishYadav32381
            </div>
          </a>
          <a href="https://www.linkedin.com/in/anishyadavv/">
            <div className="p-3 border">
              <i className="fa-brands fa-linkedin me-2"></i>@anishyadavv
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
