import React from 'react'
import { Link } from 'react-router-dom'

function Additional() {
  return (
  <>
    <section className="banner_additional d-flex align-items-center">
    <div className="container-xxl">
      <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
          <Link to={"/about"}><h1 style={{color:"#1c1c1c"}}>Get to Know us!</h1></Link>
            </div>
            </div></div>
            </section></>
  )
}

export default Additional