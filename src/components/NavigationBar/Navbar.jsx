import React from "react";
import JambLogo from "../../assets/jamb_logo.png";

export default function Navbar() {
  return (
    <div>
      {/* <nav class="navbar navbar-light bg-success">
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
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      <nav class="navbar navbar-expand-lg navbar-light bg-success">
        <div class="container-fluid">
          <a class="navbar-brand text-white" href="#">
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
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li class="nav-item ">
                <a
                  class="nav-link active text-white"
                  aria-current="page"
                  href="/allCenters"
                >
                  All Centers
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="/createCenter">
                  Create Center
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="/registeredComputers">
                  Registered Computers
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="/utmeSubjects">
                  UTME Subjects
                </a>
              </li>
              {/* <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link disabled"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li> */}
            </ul>
            {/* <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </div>
  );
}
