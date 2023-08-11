import React from 'react'
import { Link } from 'react-router-dom';
import CustomCarousel from '../Components/Carousel';
import Cards from '../Components/Cards';


const Home = () => {
  return <>
  <section className="banner">
    <div className="container-xxl">
      <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="d-flex flex-column justify-content-center ">
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                  <div className='back-details'>
                  <h1 >Recipe Heaven</h1>
                  <h2 >You totally know where good food recipes located!</h2>
                  </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  </section>
  <CustomCarousel /> 
  <Cards/>
  <section className="blogs p-5">
  <div className="container-xxl">
    <div className="row">
      <div className="col-12 text-center">
        <h1 className="mb-3">What our customers say...</h1>
        <p className="mb-4">Our customers never miss a bit on providing feedback</p>
      </div>
      <div className="col-md-3 col-sm-6 mb-4">
        <div className="card">
          {/* <img src={blog1} className="card-img-top img-fluid" alt="..." /> */}
          <div className="card-body">
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            <Link to='about'>
            <button className="mt-4">Learn more</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6 mb-4">
        <div className="card">
          {/* <img src={blog2} className="card-img-top img-fluid" alt="..." /> */}
          <div className="card-body">
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            <Link to='about'>
            <button className="mt-4">Learn more</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6 mb-4">
        <div className="card">
          {/* <img src={blog3} className="card-img-top img-fluid" alt="..." /> */}
          <div className="card-body">
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            <Link to='about'>
            <button className="mt-4">Learn more</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6 mb-4">
        <div className="card">
          {/* <img src={blog4} className="card-img-top img-fluid" alt="..." /> */}
          <div className="card-body">
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            <Link to='about'>
            <button className="mt-4">Learn more</button>
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

  {/* <Newsletter /> */}
  </>;
}

export default Home