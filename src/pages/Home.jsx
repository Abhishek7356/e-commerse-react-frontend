import React from 'react'
import Hero from '../components/Hero'
import AllCategories from '../components/AllCategories'
import AllProducts from '../components/AllProducts'
import Newsletter from '../components/Newsletter'
import Loader from '../components/Loader/Loader'

function Home() {
    return (
        <div className='w-full' >
            <Hero />
            <AllCategories />
            <h2 className='text-center text-2xl font-bold mt-28'>Order Your Favourites</h2>
            <AllProducts />
            <Newsletter />
        </div>
    )
}

export default Home