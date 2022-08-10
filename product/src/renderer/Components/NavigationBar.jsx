import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/NavigationBar.css'
import { logout } from '../firebase';
import { dir } from 'console';

function NavigationBar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const nav = useNavigate();
  const navigate = (direction) => {
    // let underline = []
    // underline = document.querySelectorAll(".button-holder button")
    // console.log(underline);
    // underline.forEach((val) => { if (val !== null) val.style.borderBottom = "none" });

    // let get = document.querySelector("." + direction);
    // console.log(get)
    // get.style.borderBottom = "4px solid rgb(121, 25, 159)"
    nav("/" + direction);
    setNavbarOpen(false);
    // location.reload();
    return;
  }
  return (
    <>
      <div className="navbar-container" onClick={() => { setNavbarOpen(true) }}>
        <i className="bi bi-list"></i>
      </div>
      <div className={`menuNav ${navbarOpen ? " showMenu" : " closeMenu"}`}>
        <div className="button-holder">
          <button className="disp" onClick={() => { navigate("disp"); setNavbarOpen(false); }}>
            Display
          </button>
          <button className="photo" onClick={() => { navigate("photo"); setNavbarOpen(false); }}>
            Import Photos
          </button>
          <button className="ics" onClick={() => { navigate("ics"); setNavbarOpen(false); }}>
            Import .ics files
          </button>
          <button className="logout" onClick={() => { logout(); location.reload() }} >
            Logout
          </button>
        </div>

        <div className="close-holder">
          <button className="close" onClick={() => { setNavbarOpen(false) }}>
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

      </div>
    </>

  );

}

export default NavigationBar;
