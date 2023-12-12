import React from 'react'
import { Link } from 'react-router-dom'

function Category({ category }) {
  return (
    <Link to={'/all-product/' + category.path}><div className='mx-5 flex-1 h-[400px] bg-slate-200 p-5'>
      <h1 className='text-3xl font-bold text-center mb-3' >Deals on {category.category} that suits your budget</h1>
      <img className='shadow-lg w-[100%] h-[100%]  object-cover' src={category.image} alt="" />
    </div></Link>
  )
}

export default Category