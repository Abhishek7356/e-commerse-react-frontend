import React from 'react'
import { Link } from 'react-router-dom'
function Product({ product }) {
    return (
        <div className='w-[250px] rounded-md pb-3 border-2 pt-2 hover:shadow-md mt-5 border-white hover:border-slate-300 duration-200   flex flex-col gap-4'>
            <Link to={'/product/'+product._id}><img src={product.image} className='w-[250px] h-[200px] object-contain' alt="" /></Link>
            <h2 className='text-center'>{product.title.slice(0, 30)}...</h2>
            <div className='w-full flex gap-2 justify-center'>
                <button className='rounded-full px-6 py-1 mx-1  bg-blue-700 text-white'><i className='fa-solid fa-heart'></i></button>
                <button className='rounded-full px-6 py-1 mx-1 bg-blue-700 text-white'><i className='fa-solid fa-cart-plus'></i></button>
            </div>
        </div>
    )
}

export default Product