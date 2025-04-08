import React from "react";
import { Link } from "react-router-dom";
import '../home/style.css';
import { FormatAlignJustifyTwoTone } from "@mui/icons-material";



const PageHome = () => {
  return (
    <div className="page-home">
      <div className="page-home-content">
        <h1>Todo sobre Brawl Stars</h1>
        <b >¡La información que necesitas de tus personajes favoritos!</b>
        <br></br>
        <br></br>
        
        <Link to="/personajes">
          <button>Ver todo</button>
        </Link>
      </div>
    </div>
  );
};

export default PageHome;
