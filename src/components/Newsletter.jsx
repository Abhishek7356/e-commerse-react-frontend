import React from 'react'

function Newsletter() {
    return (
        <div className='w-full h-[450px] bg-neutral-300 flex flex-col gap-3 justify-center items-center'>
            <h1 className='text-7xl font-bold tracking-wider'>Newsletter</h1>
            <h1 className='text-2xl font-bold tracking-wider'>Get timely update from your favorite product</h1>
            <div className='flex'>
                <input type="text" className='w-[600px] h-[40px] px-5 outline-0 border-2 border-green-800 focus:border-gray-700 duration-150' placeholder='Your Email' />
                <button className='bg-green-800 text-white px-5'>Send</button>
            </div>
        </div>
    )
}

export default Newsletter