import React from 'react'
import Header from '../../components/Header'
import Mainsection from '../../components/mainsection'
import Product_listing from './product_listing'
import Footer from '../../components/Footer'
const Home = () => {
    return (
        <>
            <Header />
            <Mainsection />
            <Product_listing />
            <Footer/>
        </>
    )
}

export default Home
