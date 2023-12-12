import React, { useEffect, useState } from 'react'
import Product from './Product'
import { getAllProducts, getCategoryProducts } from '../services/allApi';
import Loader from './Loader/Loader';

function AllProducts({ category, filters, sort }) {

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [load, setLoad] = useState(true);

  const fetchProducts = async () => {
    const response = category ? await getCategoryProducts(category) : await getAllProducts();
    setProducts(response.data)
    setLoad(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [category])

  useEffect(() => {
    const filtersItems = products.filter((item) => item.size.includes(filters.size) || item.color.includes(filters.color));
    category && setFilterProducts(filtersItems)
  }, [filters, category])

  console.log(filterProducts)

  let allProducts = products.map((item, key) => {
    return (
      <Product product={item} key={key} />
    )
  })
  let allFilteredProducts = filterProducts.map((item, key) => {
    return (
      <Product product={item} key={key} />
    )
  })

  return (
    <div className='flex-col mx-24 flex '>
      <div className=' flex gap-5  flex-wrap py-5'>
        {load ? <Loader /> : category ? (filters.color && filters.size) ? allFilteredProducts : allProducts : allProducts}
      </div>
    </div>
  )
}

export default AllProducts