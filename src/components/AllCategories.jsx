import React from 'react'
import Category from './Category'
import { categories } from './data'

function AllCategories() {

    let allCategories = categories.map((item, key) => {
        return (
            <Category category={item} key={key} />
        )
    })

    return (
        <div className='flex my-14  gap-2'>
            {allCategories}
        </div>
    )
}

export default AllCategories