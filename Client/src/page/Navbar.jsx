import React from "react";

const Navbar = () => {
  const Logo = "./assets/logo.png"; 
  return (
    <nav
      style={{
        backgroundColor: "#f0f0f0",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
       
        <span
          style={{
            fontSize: "28px",
            fontWeight: "900",

            color: "#00a3e9ff",
          }}
        >
          TODO HOLIC
        </span>
      </div>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontSize: "18px",
          fontWeight: "500",
          display: "flex",
        }}
      >
        <li
          style={{
            marginRight: "20px",
          }}
        >
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "#337ab7",
            }}
          >
            Contact Developer: +92 310 2546 466
          </a>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
