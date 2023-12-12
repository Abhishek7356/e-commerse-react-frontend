import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addOrder, deleteAllCartProducts, getCart } from '../services/allApi';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../redux/cartSlice';
import Loader from '../components/Loader/Loader';

function Success() {

    const { id } = useParams();
    const [total, setTotal] = useState([])
    const [load, setLoad] = useState(true)
    const dispatch = useDispatch()
    // console.log(id)

    const fetchData = async () => {
        const res = await getCart(id);
        setTotal(res?.data?.map((item) => item.price)?.reduce((a, b) => a + b));
        const addOrderRes = await addOrder({
            userId: id,
            products: res.data,
            amount: res?.data?.map((item) => item.price)?.reduce((a, b) => a + b),
            status: "Ordered"
        });
        console.log(id)
        const deleteAllCartRes = await deleteAllCartProducts(id);
        console.log(deleteAllCartRes);
        if (deleteAllCartRes.status == 200) {
            dispatch(emptyCart());
        }
        setLoad(false)

    }

    useEffect(() => {
        fetchData()
    }, [id])

    return (
        <div>
            {load ? <Loader /> : <div style={{ minHeight: '80vh' }} className='w-full flex justify-center flex-col items-center'>
                <img className='w-[150px]' src="https://th.bing.com/th/id/R.a1c1a8331f107deedf8ef54de1b257e3?rik=oqQ50DLg6fye8A&riu=http%3a%2f%2fcraftizen.org%2fwp-content%2fuploads%2f2019%2f02%2fsuccessful_payment_388054.png&ehk=Em4ImyRV5nk%2bEJIoj56uumAei6qyyq8J7UZVyyjeqIM%3d&risl=&pid=ImgRaw&r=0" alt="" />
                <h1 className='text-green-400 text-3xl mt-5 text-center font-bold'>Payment Successfull</h1>
                <h1 className='text-white bg-green-900 px-6 py-2 text-2xl mt-5 text-center font-bold'>Amount paid : ${total}</h1>
                <Link className=' rounded-full px-7 hover:bg-green-400 hover:text-white py-1 border-2 border-green-400 text-gray-600 mt-5 text-xl' to={'/'}>Back to home</Link>
            </div>}
        </div>
    )
}

export default Success
