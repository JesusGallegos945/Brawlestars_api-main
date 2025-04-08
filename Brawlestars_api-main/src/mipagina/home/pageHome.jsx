import React from "react";
import { Link } from "react-router-dom";
import '../home/style.css';
import { FormatAlignJustifyTwoTone } from "@mui/icons-material";



const PageHome = () => {
  return (
    <div className="page-home">
      <div className="page-home-content">
        <h1>Everythin about Exercise</h1>
        <b >The best information in the word</b>
        <br></br>
        <br></br>
        
        <Link to="/personajes">
          <button>More</button>
        </Link>
      </div>
    </div>
  );
};

export default PageHome;
