import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CustomCarousel from '../Components/Carousel';
import Cards from '../Components/Cards';
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../axios';
import { useSelector } from 'react-redux';
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { recipes } = useSelector((state) => state.recipes);
  const isPostsLoading = recipes.status === "loading";
console.log(recipes);
  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/recipe/search?title=${searchQuery}`);
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
  <Cards recipeData={recipes.items} isPostsLoading={isPostsLoading}/>
  <section className="replies p-5">
  <div className="container-xxl">
    <div className="row">
      <div className="col-12 text-center">
        <h1 className="mb-3">Some Feedbacks from food critics...</h1>
        <p className="mb-4">Look what they have to say about our site</p>
      </div>
      <div className="col-md-3 col-sm-6 mb-4">
        <div className="card">
          {/* <img src={blog1} className="card-img-top img-fluid" alt="..." /> */}
          <div className="card-body">
         <blockquote>"The website impresses with its clean and intuitive design. The user interface is a delight to navigate, creating a seamless experience that mirrors the harmony of flavors in a gourmet meal."</blockquote>
         <figcaption>Amelia Finch - Renowned Culinary Columnist</figcaption>
            {/* <Link to='/'>
            <button className="mt-4">Learn more</button>
            </Link> */}
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6 mb-4">
        <div className="card">
          <div className="card-body">
          <blockquote>"While the content is engaging and informative, the website's layout could use some refinement. Just as a chef a more organized presentation would enhance the overall user experience."
</blockquote>
         <figcaption>Isabella Martinez - Michelin-Starred Chef Critic
</figcaption>
            {/* <Link to='/'>
            <button className="mt-4">Learn more</button>
            </Link> */}
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6 mb-4">
        <div className="card">
          {/* <img src={blog3} className="card-img-top img-fluid" alt="..." /> */}
          <div className="card-body">
          <blockquote>"This website is a digital feast for the eyes, capturing the essence of culinary artistry. The use of interactive elements mirrors the excitement of savoring a creative culinary creation."
</blockquote>
         <figcaption>Ethan Thornton - Gourmet Magazine Editor
</figcaption>
            {/* <Link to='/'>
            <button className="mt-4">Learn more</button>
            </Link> */}
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6 mb-4">
        <div className="card">
          {/* <img src={blog4} className="card-img-top img-fluid" alt="..." /> */}
          <div className="card-body">
          <blockquote>"The website's performance leaves a lot to be desired. As a front-end developer, focusing on optimizing loading times and overall responsiveness would greatly enhance user satisfaction."
</blockquote>
         <figcaption>Jackson Reed - Digital Food Culture Blogger
</figcaption>
            {/* <Link to='/'>
            <button className="mt-4">Learn more</button>
            </Link> */}
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

  </>)
}

export default Home