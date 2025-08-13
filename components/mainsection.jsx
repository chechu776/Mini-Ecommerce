import React from 'react'
import bg from "../src/assets/bg.png"
import { Link } from 'react-router-dom'
import versace from "../src/assets/Group.png"
import zara from "../src/assets/zara-logo-1 1.png"
import gucci from "../src/assets/gucci-logo-1 1.png"
import prada from "../src/assets/prada-logo-1 1.png"
import ck from "../src/assets/Group (1).png"

const Mainsection = () => {
    return (
        <>
        <div
            className="w-screen h-150 bg-contain bg-no-repeat p-20"
            style={{ backgroundImage: `url(${bg})`, backgroundSize: "100%" }}
        >
            <div className='w-5/12'>
                <h1 className='font-bold text-6xl' style={{ fontFamily: "Integral CF" }}>
                    FIND CLOTHES THAT MATCHES YOUR STYLE
                </h1>
                <p className='my-10' style={{ fontFamily: "satoshi" }}>
                    Browse through our diverse range of meticulously crafted garments,
                    designed to bring out your individuality and cater to your sense of style.
                </p>
                <Link className='px-20 py-4 rounded-4xl cursor-pointer bg-black text-white hover:bg-black/80'>
                    Shop Now
                </Link>
            </div>
        </div>
        <div className='bg-black flex items-center px-20 justify-between h-28 '>
            <img src={versace} alt="" />
            <img src={zara} alt="" />
            <img src={gucci} alt="" />
            <img src={prada} alt="" />
            <img src={ck} alt="" />
        </div>
        </>
    )
}

export default Mainsection