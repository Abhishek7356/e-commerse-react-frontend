import React from 'react'
import { Link } from 'react-router-dom'

function Cancel() {
    return (

        <div style={{ minHeight: '80vh' }} className='w-full flex justify-center flex-col items-center'>
            <img className='w-[150px]' src="https://th.bing.com/th/id/OIP.LyhAsnpTT1SE7KVdKg5rpwHaHa?rs=1&pid=ImgDetMain" alt="" />
            <h1 className='text-red-500 text-3xl mt-5 text-center font-bold'>Payment Failed</h1>
            <Link className=' rounded-full px-7 hover:bg-red-500 hover:text-white py-1 border-2 border-red-500 text-gray-600 mt-5 text-xl' to={'/'}>Back to home</Link>
        </div>

    )
}

export default Cancel