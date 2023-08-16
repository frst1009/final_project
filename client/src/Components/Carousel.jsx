import React, { useEffect, useState } from "react";
import { Carousel, Card } from "antd";

const CustomCarousel = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategoriesData()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const fetchCategoriesData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categoriesData = [
          {
            id: 1,
            name: "Breakfast",
            image:
              "https://falstaff.b-cdn.net/core/5758261/die-10-besten-fruehstueckslokale-in-muenchen_5758261.jpg",
          },
          {
            id: 2,
            name: "Lunch",
            image:
              "https://hips.hearstapps.com/hmg-prod/images/healthy-recipes-marquee-1577978180.png",
          },
          {
            id: 3,
            name: "Dinner",
            image:
              "https://images.theconversation.com/files/368263/original/file-20201109-22-lqiq5c.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop/example.com/dinner.jpg",
          },
          {
            id: 4,
            name: "Dessert",
            image:
              "https://www.southernliving.com/thmb/z706skTv8rLcnFwyTEnMzr_H5zQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Southern-Living_27364_SR_Lemon-Lush_13190-fd96c709fc2946a7aeb5c869f9ad470e.jpg",
          },
          {
            id: 5,
            name: "Snacks",
            image:
              "https://www.foodbusinessnews.net/ext/resources/2019/5/SnackVariety_Lead.jpg?height=667&t=1558527976&width=1080",
          },
          {
            id: 6,
            name: "Beverages",
            image:
              "https://foodsafetyworks.com/wp-content/uploads/2023/01/04_22_HERO2_NA_Cocktails_GettyImages-1145767236_1920x1280-1024x683.jpg",
          },
        ];
        resolve(categoriesData);
      }, 1000);
    });
  };

  if (categories.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ margin: "5%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "70px",
          marginTop: "100px",
        }}
      >
        <p style={{ fontSize: "25px", fontWeight: "800" }}>Categories</p>
      </div>
      <Carousel slidesToShow={3} autoplay autoplaySpeed={2000} className="Card">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="custom-card"
            cover={<img alt={category.name} src={category.image} />}
            hoverable
          >
            <Card.Meta title={category.name} />
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
