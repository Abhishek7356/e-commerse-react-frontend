import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js';
import { deleteCart, paymentCheckout } from '../services/allApi';
import { deleteProduct } from '../redux/cartSlice';

function CartList() {

    const cartItems = useSelector((state) => state.cartReducer)
    console.log(cartItems)
    const dispatch = useDispatch()


    // console.log(stripeToken)

    const handleCheckout = async () => {
        const stripe = await loadStripe('pk_test_51OIFneSFZU4EoqJju3Bpe7so9JIftereP286kS3p98clNAht2R94PVwUj9i3NNOJdrgmIzkBbGImVrCq7K0X7WHu00ui18coMR');
        const response = await paymentCheckout({ products: cartItems })
        console.log(response);
        const result = await stripe.redirectToCheckout({
            sessionId: response?.data?.id
        });

    }

    const handleDeleteCart = async (id) => {
        const res = await deleteCart(id);
        if (res.status == 200) {
            dispatch(deleteProduct(id));
        }
    }

    const allCartItems = cartItems.map((item, key) => {
        return (
            <div key={key}>
                <div className='flex justify-between py-5 items-center' >
                    <div className='flex gap-7 items-center'>
                        <img className='h-[270px] w-[270px] object-contain rounded-md ' src={item.image} alt="" />
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-lg'><span className='font-bold'>Product :</span> {item.product}</h1>
                            <h1 className='text-lg'><span className='font-bold'>ID :</span> {item.productId}</h1>
                            <div className='h-[20px] w-[20px] rounded-full ' style={{ backgroundColor: `${item.color}` }}></div>
                            <h1 className='text-lg'><span className='font-bold'>SIZE :</span> {item.size} </h1>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        <div className='flex gap-1'>
                            <i class="fa-solid fa-minus  hover:bg-gray-300 px-3 py-1 text-xl cursor-pointer rounded-md"></i>
                            <div className='py-1 rounded-lg text-xl font-bold'>{item.quantity}</div>
                            <i class="fa-solid fa-plus hover:bg-gray-300 px-3 py-1 text-xl cursor-pointer rounded-md"></i>
                        </div>
                        <div>
                            <h1 className='text-3xl text-center'>₹ {item.price}</h1>
                            <button onClick={() => handleDeleteCart(item._id)} className='text-lg mt-6 underline py-2 text-red-400 w-[200px]'>Remove From Cart</button>
                        </div>
                    </div>
                </div>
                <hr className='h-[2px] w-[100%] bg-gray-400' />
            </div>
        )
    })

    return (
        <div className='min-h-screen p-8'>
            <div className='flex justify-between items-end'>
                <button className='py-2 px-3 border-2 border-purple-700 tracking-widest  hover:bg-purple-700 font-bold text-purple-700 hover:text-white duration-200'>CONTINUE SHOPPING</button>
                <div className='flex gap-5'>
                    <p className='text-lg'>Shopping Bag ({cartItems.length})</p>
                    <p className='text-lg'>Whishlist (0)</p>
                </div>
                {cartItems.length > 0 && <button className='py-2 px-3 tracking-widest outline outline-gray-800 duration-150 hover:outline-offset-4  bg-gray-800 font-bold  text-white'>CHECKOUT NOW</button>}
            </div>
            <div className='flex my-9 items-start'>
                <div className='flex-1 px-3   flex flex-col'>
                    {
                        allCartItems.length > 0 ? allCartItems :
                            <div className='w-full flex flex-col items-center'>
                                <img className='w-[400px] ' src='https://cdni.iconscout.com/illustration/premium/thumb/your-cart-is-empty-2161427-1815069.png' />
                                <h1 className='text-2xl font-bold text-red-400'>Cart Is Empty !</h1>
                            </div>
                    }
                </div>
                {cartItems.length > 0 &&
                    <div className='w-[350px] flex items-center p-5 flex-col gap-6 border-2 border-gray-400'>
                        <h1 className='text-3xl'>ORDER SUMMARY</h1>
                        <div className='flex justify-between w-full'>
                            <h1 className='text-xl font-bold'>Subtotal</h1>
                            <h1 className='text-xl font-bold'>₹ {cartItems.length > 0 && cartItems.map((item) => item.price).reduce((a, b) => a + b)}</h1>
                        </div>
                        <div className='flex justify-between w-full'>
                            <h1 className='text-xl font-bold'>Estimate Shipping</h1>
                            <h1 className='text-xl font-bold'>₹ 50</h1>
                        </div>
                        <div className='flex justify-between w-full'>
                            <h1 className='text-xl font-bold'>Shipping Discount</h1>
                            <h1 className='text-xl font-bold'>₹ -5.90</h1>
                        </div>
                        <div className='flex justify-between w-full'>
                            <h1 className='text-xl font-bold'>Total</h1>
                            <h1 className='text-xl font-bold'>₹ {cartItems.length > 0 && cartItems.map((item) => item.price).reduce((a, b) => a + b)}</h1>
                        </div>

                        <button onClick={handleCheckout} className='py-2 px-5 w-full tracking-widest outline outline-gray-800 duration-150 hover:outline-offset-4  bg-gray-800 font-bold  text-white'>CHECKOUT NOW</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default CartList