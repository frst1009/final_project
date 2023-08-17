import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CustomCarousel from '../Components/Carousel';
import Cards from '../Components/Cards';
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../axios';
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/recipe/search?title=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  useEffect(() => { 
   
    if (searchQuery.trim() !== "") {
      handleSearch();
    } 
   else  if (searchQuery === "") {
      setSearchResults([]);
    }
  }, [searchQuery]);


  return( <>
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
                <div className="search-container">
      <div className="input-group d-none d-md-flex">
        <input
          type="text"
          value={searchQuery}
          className="form-control"
          placeholder="Search recipes..."
          aria-label="Search recipes..."
          aria-describedby="basic-addon2"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="clear-button"
            onClick={() => setSearchQuery("")}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        )}
       
      </div>
      <div className="search-results d-none d-md-flex flex-column">
      {searchResults.map((recipe) => (
    <Link key={recipe._id} to={`/details/${recipe._id}`} className="search-result">
      {recipe.title}
    </Link>
  ))}
        {searchQuery && searchResults.length === 0 && (
          <div className="no-results">No recipes found</div>
        )}
      </div>
    </div>
                {/* </div> */}
          
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
  <section className="replies p-5">
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
            <Link to='/'>
            <button className="mt-4">Learn more</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6 mb-4">
        <div className="card">
          <div className="card-body">
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            <Link to='/'>
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
            <Link to='/'>
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
            <Link to='/'>
            <button className="mt-4">Learn more</button>
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

  </>)
}

export default Home