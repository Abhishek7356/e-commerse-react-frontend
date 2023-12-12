import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addCart, getSingleProducts } from '../services/allApi';
import { useDispatch, useSelector } from 'react-redux';
import { GetProduct, addCartProduct, addProduct } from '../redux/cartSlice';
import Loader from '../components/Loader/Loader';

function ProductDetails() {

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const [load, setLoad] = useState(true);
    const { id } = useParams();
    const currentUser = useSelector((state) => state.userReducer.user)
    // console.log(id)
    // console.log(size)

    const dispatch = useDispatch();

    const fetchProduct = async () => {
        const response = await getSingleProducts(id);
        setProduct(response.data)
        setColor(response.data.color[0]);
        setSize(response.data.size[0])
        setLoad(false)
    }

    console.log(color)
    console.log(size)

    const handleQuantity = (type) => {
        if (type == "dec") {
            quantity > 1 && setQuantity(quantity - 1)
        } else if (type == "inc") {
            setQuantity(quantity + 1)
        }
    }

    const handleAddToCart = async () => {
        const res = await addCart({ userId: currentUser._id, product: product.title, productId: id, quantity, color, size, image: product.image, price: quantity * product.price });
        console.log(res)
        if (res.status == 200) {
            dispatch(addCartProduct(res.data))
        } else if (res.message) {
            alert(res.response.data)
        } else {
            alert("Something Went Wrong Can't add to cart")
        }
    }
    console.log(currentUser)

    useEffect(() => {
        fetchProduct();
    }, [id])

    return (
        <div className=' py-16'>
           {load ? <Loader/> : <div className='flex justify-center '>
                <img src={product?.image} loading='lazy' className='h-[70vh] rounded-lg object-contain flex-1' alt="" />
                <div className='flex flex-1 flex-col gap-6 pr-5 justify-center'>
                    <h1 className='text-4xl font-bold'>{product?.title}</h1>
                    <p className='text-xl'>{product?.desc}</p>
                    <h1 className='text-5xl font-bold'>₹  {product?.price * quantity}</h1>
                    <div className='flex gap-11'>
                        <div className='flex gap-2 items-center'>
                            <p className='text-xl'>Color :</p>
                            {product?.color?.map((item) => {
                                const clr = item.toLowerCase();
                                return (
                                    <div onClick={() => setColor(item)} className='h-[25px] cursor-pointer w-[25px] rounded-full border-2 border-gray-200' style={{ backgroundColor: `${clr}` }}></div>
                                )
                            })}
                        </div>
                        <div>
                            <label for="cars" className='text-xl'>Size:</label>
                            <select onChange={(e) => setSize(e.target.value)} name="cars" id="cars" className='text-xl px-3'>
                                {product?.size?.map((item) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>

                    </div>
                    <div className='flex gap-11'>
                        <div className='flex gap-1 items-center'>
                            <i onClick={() => handleQuantity("dec")} class="fa-solid fa-minus  hover:bg-gray-300 px-3 py-1 text-xl cursor-pointer rounded-md"></i>
                            <div className='py-1 rounded-lg px-6 border-2 border-purple-700 text-xl font-bold'>{quantity}</div>
                            <i onClick={() => handleQuantity("inc")} class="fa-solid fa-plus hover:bg-gray-300 px-3 py-1 text-xl cursor-pointer rounded-md"></i>
                        </div>
                        <button onClick={handleAddToCart} className='px-5 py-2 border-2 border-lime-500 hover:bg-lime-500 duration-200'>ADD TO CART</button>

                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ProductDetails