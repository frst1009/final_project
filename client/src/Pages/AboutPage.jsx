/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';


const About = () => {
  return <>
  <section className="about-wrapper p-5 d-flex justify-content-center align-items-center">
    <div className="container-xl">
      <div className="row">
          <div className="shop-details text-center align-items-center">
            <h1 className="text">About the Cooking Monsters!</h1>
          </div>
        </div>
      </div>
  </section>
  <section className="about-us p-5">
    <div className="row">
      <div className="col-md-5">
        <img src={"https://media.istockphoto.com/id/1403973419/photo/table-top-of-food-spread-on-table.jpg?s=170667a&w=0&k=20&c=vlN1euMKchsFVAFM-6S4ZKhr7bWGVv_WEQXb2bjvSYg="} alt="" className='img-fluid p-5' />
      </div>
      <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
        <h1><b>What this site is about?</b></h1>
        <p className="card-text mb-3">You can explore many recipes and find the answer to the most hated question: "What am i going to eat today?" You don't have to know the answer if you are curios person and an explorer to new cuisines</p>
        <p className="card-text mb-3">Sign up right now to create your very first recipe in our site <br /> we promise a ffriendly interface and possibilities to write feedbacks Hope you will enjoy this journey with us on Cooking Monsters!</p>
      </div>
    </div>
  </section>

  
  </>;
}

export default About;