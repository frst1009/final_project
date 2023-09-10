import React from "react";
import "./spinner.css";

export default function Spinner() {
  return (
    <div className="spinner-container" style={{display:"flex", justifyContent:"center"}}>
      <div className="loading-spinner">
      </div>
    </div>
  );
}