import { commonApi } from "./commonApi"
import { SERVER_URL } from "./server_url"

const header = {
    "Content-Type": "application/json",
    "token": `Bearer ${JSON.parse(sessionStorage.getItem("user")) && JSON.parse(sessionStorage.getItem("user")).accessToken}`
}

export const getAllProducts = async () => {
    return await commonApi('get', `${SERVER_URL}/api/product`, '', '')
}
export const getCategoryProducts = async (category) => {
    return await commonApi('get', `${SERVER_URL}/api/product?category=${category}`, '', '')
}
export const getSingleProducts = async (id) => {
    return await commonApi('get', `${SERVER_URL}/api/product/find/${id}`, '', '')
}



export const paymentCheckout = async (data) => {
    return await commonApi('post', `${SERVER_URL}/api/checkout/payment`, data, '')
}


//register api
export const registerApi = async (data) => {
    return await commonApi('post', `${SERVER_URL}/auth/user/register`, data, '')
}
//login api
export const loginApi = async (data) => {
    return await commonApi('post', `${SERVER_URL}/auth/user/login`, data, '')
}
//get cart
export const getCart = async (id) => {
    return await commonApi('get', `${SERVER_URL}/api/cart/find/${id}`, '', '')
}
//add cart
export const addCart = async (data) => {
    return await commonApi('post', `${SERVER_URL}/api/cart`, data, header)
}
//delete cart
export const deleteCart = async (id) => {
    return await commonApi('delete', `${SERVER_URL}/api/cart/${id}`, {}, header)
}
//delete all cart products
export const deleteAllCartProducts = async (id) => {
    return await commonApi('delete', `${SERVER_URL}/api/cart/delete/${id}`, {}, header)
}
//add order
export const addOrder = async (data) => {
    return await commonApi('post', `${SERVER_URL}/api/order`, data, '')
}
//get user orders
export const getUserOrders = async (id) => {
    return await commonApi('get', `${SERVER_URL}/api/order/find/${id}`, '', header)
}

