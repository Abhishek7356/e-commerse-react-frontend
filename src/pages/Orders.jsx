import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserOrders } from '../services/allApi';
import Loader from '../components/Loader/Loader';

function Orders() {

    const user = useSelector((state) => state.userReducer.user)
    const [orders, setOrders] = useState([]);
    const [load, setLoad] = useState(true);
    console.log(user)

    const fetchData = async () => {
        const res = await getUserOrders(user._id);
        setOrders(res.data)
        setLoad(false)
    }
    console.log(orders)

    useEffect(() => {
        fetchData()
    }, [])

    const allOrders = orders.map((item, key) => {
        return (
            <tr key={key} className='border-b-2 border-b-gray-300'>
                <td>
                    {item.products.map((pro) => {
                        return (
                            <div className='flex gap-3 border-b-2 items-center'>
                                <img src={pro.image} style={{ width: '100px', height: '100px', objectFit: 'contain' }} alt="" />
                                <div className='flex flex-wrap gap-4 items-start'>
                                    <h1>{pro.product}</h1>|
                                    <h1>Price : ₹ {pro.price}</h1>|
                                    <h1>Size : {pro.size}</h1>|
                                    <h1>Quantity : {pro.quantity}</h1>|
                                    <h1 className='flex items-center gap-2'>Color : <div style={{ backgroundColor: `${pro.color}`, height: '15px', width: '15px', borderRadius: '50%' }}></div></h1>
                                </div>
                            </div>
                        )
                    })}
                </td>
                <td>{item.createdAt}</td>
                <td className='text-green-500' style={{ fontSize: '20px' }}><i class="fa-solid fa-circle-check" style={{marginRight:'3px'}}></i>{item.status}</td>
                <td style={{ fontSize: '20px' }}>₹ {item.amount}</td>
                <td style={{ fontSize: '20px' }}>{item?.products?.length}</td>
            </tr>
        )
    })

    return (
        <div style={{ minHeight: '90vh' }} className='w-full py-5 px-10'>
            <h1 className='text-3xl font-bold border-b-4 border-b-blue-600 inline pb-2'>My Orders</h1>
            {load ? <Loader /> :
                <table class="fl-table mt-10">
                    <thead>
                        <tr>
                            <th>Products</th>
                            <th>Date</th>
                            <th>status</th>
                            <th>Amount Paid</th>
                            <th>Total Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders}
                    </tbody>
                </table>}
        </div>
    )
}

export default Orders