import React from 'react'
import RecipeCard from '../Components/Cards'
import CategoryCarousel from '../Components/Carousel/Carousel'
import Hero from '../Components/Hero/Hero'


function Main() {
    return (<>   <Hero />
        <CategoryCarousel />
        <RecipeCard />
    </>

    )
}

export default Main