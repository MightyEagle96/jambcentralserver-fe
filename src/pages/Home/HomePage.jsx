import React from "react";
import JambLogo from "../../assets/jamb_logo.png";
import "./HomePage.css";
export default function HomePage() {
  return (
    <div>
      <div className="welcomeBanner">
        <div className="text-center ">
          <img src={JambLogo} alt="" className="resizeLogo mt-5" />
        </div>
        <div className="text-center h3 mt-3 text-white">
          Central Server Manager
        </div>
        <div className="mt-3 text-center">
          <button
            className="btn btn-success"
            onClick={() => {
              window.location.assign("/allCenters");
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
