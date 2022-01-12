import React from "react";
import JambLogo from "../../assets/jamb_logo.png";

export default function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-light bg-success">
        <div class="container">
          <a href="#" className="navbar-brand text-white">
            <img
              src={JambLogo}
              alt=""
              srcset=""
              width="28"
              height="24"
              className="d-inline-block align-text-top me-2"
            />
            Central Server Monitor
          </a>
        </div>
      </nav>
    </div>
  );
}
