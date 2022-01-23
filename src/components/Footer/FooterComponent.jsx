import React from "react";
import "./Footer.css";
import JambLogo from "../../assets/jamb_logo.png";
export default function FooterComponent() {
  return (
    <div>
      <footer className="footer p-4">
        <div className="text-center">
          <img src={JambLogo} alt="" className="footerLogo" />
        </div>
      </footer>
    </div>
  );
}
