import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi } from '../services/allApi'

function Login() {

    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    console.log(user)

    const navigate = useNavigate()

    const handleLogin = async () => {
        const { username, password } = user;
        if (username && password) {
            const response = await loginApi(user)
            console.log(response)
            if (response.status == 200) {
                sessionStorage.setItem("user", JSON.stringify(response.data));
                alert("User Login Successfull")
                window.location.reload()
                navigate('/')
            } else {
                alert(response.response.data)
            }
        } else {
            alert("Provide all details correctly")
        }
    }

    return (
        <div className='min-h-screen flex justify-center items-center loginBackground'>
            <div className='flex h-[70vh] w-[60%] border-2 shadow-lg '>
                <div className='w-[40%] flex flex-col justify-between bg-blue-500 p-9'>
                    <div className='flex flex-col gap-5'>
                        <h1 className='text-3xl font-bold text-slate-100 tracking-widest'>Login</h1>
                        <p className='text-xl tracking-widest font-bold text-slate-100'>Get access to your Orders, Wishlist and Recommendations</p>
                    </div>
                    <img className='w-full rounded-full ' src="https://th.bing.com/th/id/OIP.zB9r57aQ2nmQWBo3xQQD2AAAAA?pid=ImgDet&rs=1" alt="" />
                </div>
                <div className='flex flex-col gap-5 p-9 items-center w-[60%] justify-center'>
                    <input onChange={(e) => setUser({ ...user, username: e.target.value })} value={user.username} className='px-5  w-[100%] py-2 border-2 border-blue-500 text-xl outline-0 ' type="text" placeholder='Username' />
                    <input onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password} className='px-5  w-[100%] py-2 border-2 border-blue-500 text-xl outline-0 ' type="password" placeholder='Password' />
                    <p>Forgot Password ?</p>
                    <button onClick={handleLogin} className='bg-blue-600 outline outline-blue-600 duration-150 hover:outline-offset-4 py-2 rounded-full px-6 text-slate-100 font-bold text-xl' >Login</button>
                    <Link to={'/register'}><p className='text-xl underline cursor-pointer'>New User</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Login