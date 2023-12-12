import React, { useEffect, useState } from 'react'
import Newsletter from '../components/Newsletter'
import AllProducts from '../components/AllProducts'
import { useParams } from 'react-router-dom'

function ProductList() {

    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState("newest")
    const { cat } = useParams();
    console.log(cat)

    const handleFilter = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }
    const handleSort = (e) => {
        setSort(e.target.value)
    }

    console.log(sort)
    console.log(filters)

    return (
        <div>
            <div className='p-5'>
                <h1 className='text-4xl border-b-4 inline border-b-blue-700 font-bold'>{cat}</h1>
                <div className='flex justify-between pt-9'>
                    <div className='flex gap-3 items-center'>
                        <h1 className='text-2xl font-bold'>Filter Products : </h1>
                        <label for="cars" className='text-xl'>Color:</label>
                        <select onChange={(e) => handleFilter(e)} name="color" id="color" className='text-xl px-3'>
                            <option >Red</option>
                            <option >Blue</option>
                            <option >Black</option>
                            <option >White</option>
                        </select>
                        <label for="cars" className='text-xl ml-5'>Size:</label>
                        <select onChange={(e) => handleFilter(e)} name="size" id="size" className='text-xl px-3'>
                            <option >XS</option>
                            <option >S</option>
                            <option >M</option>
                            <option >L</option>
                            <option >XL</option>
                        </select>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <h1 className='text-2xl font-bold'>Sort Products : </h1>
                        <select onChange={(e) => handleSort(e)} name="sort" id="sort" className='text-xl px-3'>
                            <option value="newest">Newest</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>
                <AllProducts category={cat} sort={sort} filters={filters} />
                <Newsletter />
            </div>
        </div>
    )
}

export default ProductList