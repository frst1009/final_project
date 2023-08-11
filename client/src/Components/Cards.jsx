import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as heart,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidheart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../redux/slices/recipes";
import TagBubble from "./TagBubbles";

const Cards = () => {
  const [isLiked, setIsLiked] = useState(false);
  const handleClick = () => {
    setIsLiked(!isLiked);
  };
  const dispatch = useDispatch();
  const { recipes} = useSelector((state) => state.recipes); //refering to store
  const isPostsLoading = recipes.status == "loading";
  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);


  return (
    <section className="hot-deals p-5">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "0.8px solid #250f06",
          borderTop: "0.8px solid #250f06",
          marginBottom: "40px",
        }}
      >
        <p style={{ fontSize: "25px", fontWeight: "800" }}>Recipes</p>
        
      </div><TagBubble/>
      <div className="container-xxl">
        <Row gutter={[16, 16]}>
          {isPostsLoading
    ? [...Array(5)].map((_, index) => (
        <Col key={index} xs={24} md={8}>
          <Card className="custom-card loading-card" />
        </Col>
      ))
    : recipes.items.map((obj) => (
        <Col key={obj._id} xs={24} md={8}>
          <Card
            hoverable
            className="custom-card"
            bodyStyle={{ padding: "16px" }}
          >
                  <div
                    className="card-image"
                    style={{ backgroundImage: `url("https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=eaKRSIAoRGHMibSfahMyQS6iFADyVy1pnPdy1O5rZ98=")` }}
                  />
                  <div className="card-content">
                    <Link to='/details'>
                      {" "}
                      <h3 className="card-title">{obj.title}</h3>
                    <div> <p className="card-description">
                    {obj.instructions.length > 100
          ? obj.instructions.substring(0, 100) + "..." 
          : obj.instructions}
      </p></div>  
                    </Link>
                    <div className="card-content-icon">
                      <FontAwesomeIcon
                        icon={isLiked ? solidheart : heart}
                        onClick={handleClick}
                        style={{ color: "grey" }}
                      />
                      <FontAwesomeIcon
                        icon={faComment}
                        style={{ color: "grey" }}
                      />
                    </div>
                  </div>
                </Card>
              </Col>
            )
          )}
        </Row>
      </div>
    </section>
  );
};

export default Cards;


// {obj.tags.length >= 3
//           ? obj.tags.slice(0, 3).map((tag, index) => (
//               <span key={index}>#{tag} </span>
//             ))
//           : obj.tags.map((tag, index) => (
//               <span key={index}>#{tag} </span>
//             ))}


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Cards = () => {
//   // Replace this with actual data fetched from the server
//   const [cardsData, setCardsData] = useState([
//     {
//       id: 1,
//       title: 'Hot Deals',
//       description: 'Buy One get One free.',
//       imageUrl: "https://ca-times.brightspotcdn.com/dims4/default/78ccdc9/2147483647/strip/true/crop/1920x1080+0+0/resize/1200x675!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fb1%2Ffa%2F991da28e44019f3f83d083d1a966%2Ffood-1920w-0000000.jpg",
//       link: '/blog',
//     },
//     {
//       id: 2,
//       title: 'Season-In',
//       description: 'All Weather Attire',
//       imageUrl: "https://ca-times.brightspotcdn.com/dims4/default/78ccdc9/2147483647/strip/true/crop/1920x1080+0+0/resize/1200x675!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fb1%2Ffa%2F991da28e44019f3f83d083d1a966%2Ffood-1920w-0000000.jpg",
//       link: '/blog',
//     },
//     // Add more card data objects here...
//   ]);

//   // Fetch data from the server (useEffect, fetch, axios, etc.)
//   useEffect(() => {
//     // Fetch data from the server and setCardsData with the actual data
//     // Example:
//     // fetch('/api/cards')
//     //   .then(response => response.json())
//     //   .then(data => setCardsData(data))
//     //   .catch(error => console.error('Error fetching card data:', error));
//   }, []);

//   return (
//  <div  className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 p-3">
//       {/* {PRODUCTS.slice(2, 6).map((product) => ( */}
//         <div className="col mb-5"> {cardsData.map((card) => (
//         <div className="card h-100 m-auto"  key={card.id}>
//           {/* <img src={product.image} className="card-img-top img-fluid" alt="..." /> */}
//           <img src={card.imageUrl} className="img-fluid rounded-start" alt="" />
//           <div className="card-body">
//             <p className="card-text mb-2">SOmething</p> <h5 className="card-title">{card.title}</h5>
//             <div className="card-footer m-auto text-center">
//             <h2 className="card-text mb-2">{card.description}</h2>
//             <p className="price"><span className="red"></span> likes </p>
//             </div>
//             <div className="card-footer d-md-none">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <Link to='shop' className='m-auto'>View products</Link>
//                 </div>
//               </div>
//           </div>
//         </div>))}
//         </div>
//     </div>
//   );
// };

// export default Cards;

// <section className="hot-deals p-5 d-flex flex-column flex-md-row justify-content-center align-items-center align-items-md-start">
// <div className="container-xxl">
//   <div className="row">
//     {cardsData.map((card) => (
//       <div key={card.id} className="col-md-6 d-flex">
//         <div className="card m-auto mb-3">
//           <div className="row g-0">
//             <div className="col-md-4">
//               <img src={card.imageUrl} className="img-fluid rounded-start" alt="" />
//             </div>
//             <div className="col-md-8">
//               <div className="card-body">
//                 <h5 className="card-title">{card.title}</h5>
//                 <h2 className="card-text mb-2">{card.description}</h2>
//                 {/* Add more card data here */}
//                 <Link to={card.link}>
//                   <button className="mt-4">Learn more</button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
// </section>
