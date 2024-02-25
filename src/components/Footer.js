import React from "react";
import { useLocation } from "react-router";

const Footer = () => {
  const location = useLocation();
  return (
    <div>
      <p
        className={`text-center mt-2 ${
          location.pathname === "/login" ? "d-none" : ""
        }`}
      >
        Made with ❤️ by Anish
      </p>
    </div>
  );
};

export default Footer;
