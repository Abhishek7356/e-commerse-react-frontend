import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerApi } from '../services/allApi'

function Register() {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    console.log(user)
    console.log(confirmPassword)

    const handleRegister = async () => {
        const { username, email, password } = user;
        if (username && email && password && confirmPassword) {
            if (password == confirmPassword) {
                const response = await registerApi({ username, email, password });
                console.log(response)
                if (response.status == 201) {
                    alert("User Registered Successfully")
                    navigate('/login')
                } else {
                    alert("Something Went Wrong")
                }
            } else {
                alert("confirm password is not matching")
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
                        <h1 className='text-3xl font-bold text-slate-100 tracking-widest'>Register</h1>
                        <p className='text-xl tracking-widest font-bold text-slate-100'>Get access to your Orders, Wishlist and Recommendations</p>
                    </div>
                    <img className='w-full rounded-full ' src="https://th.bing.com/th/id/OIP.zB9r57aQ2nmQWBo3xQQD2AAAAA?pid=ImgDet&rs=1" alt="" />
                </div>
                <div className='flex flex-col gap-5 p-9 items-center w-[60%] justify-center'>
                    <input onChange={(e) => setUser({ ...user, username: e.target.value })} value={user.username} className='px-5  w-[100%] py-2 border-2 border-blue-500 text-xl outline-0 ' type="text" placeholder='User Name' />
                    <input onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} className='px-5  w-[100%] py-2 border-2 border-blue-500 text-xl outline-0 ' type="email" placeholder='Email Address' />
                    <div className='flex gap-2'>
                        <input onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password} className='px-5 flex-1 w-[100%] py-2 border-2 border-blue-500 text-xl outline-0 ' type="password" placeholder='Password' />
                        <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className='px-5 flex-1 w-[100%] py-2 border-2 border-blue-500 text-xl outline-0 ' type="password" placeholder='Confirm Password' />
                    </div>
                    <div className='flex gap-6 items-center'>
                        <button onClick={handleRegister} className='bg-blue-600 outline outline-blue-600 duration-150 hover:outline-offset-4 py-2 rounded-full px-6 text-slate-100 font-bold text-xl' >Register</button>
                        <Link to={'/login'}><p className='underline cursor-pointer text-xl'>Allready have an account</p></Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register