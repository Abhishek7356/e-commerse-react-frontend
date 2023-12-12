import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../services/allApi';
import { GetProduct } from '../redux/cartSlice';

// import MenuIcon from '@mui/icons-material/Menu';

function Header() {

    const products = useSelector((state) => state.cartReducer)
    const currentUser = useSelector((state) => state.userReducer.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchCart = async () => {
        const res = await getCart(currentUser?._id);
        dispatch(GetProduct(res.data))
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const handleLogOut = () => {
        sessionStorage.clear();
        window.location.reload();
        navigate('/login')
    }
    // console.log(productQuantity)

    return (
        <div style={{ position: 'sticky', top: '0px' }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <i class="fa-solid fa-bars text-white text-xl" ></i>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to={'/'}><span className='font-bold' style={{ fontWeight: 'bold' }}>Shoppy</span></Link>
                        </Typography>
                        <div className='w-[63%] flex justify-between'>
                            <div>
                                <input className='w-[400px] h-[100%] px-5 outline-0 text-black' type="text" placeholder='Search here' />
                                <Button color="inherit"><i class="fa-solid text-2xl fa-magnifying-glass"></i></Button>
                            </div>
                            <div>
                                {currentUser && <Link to={'/orders'}><Button color="inherit">Orders</Button></Link>}
                                {!currentUser && <Link to={'/register'}><Button color="inherit">Sign Up</Button></Link>}
                                {!currentUser && <Link to={'/login'}><Button color="inherit">Log In</Button></Link>}
                                {currentUser && <Button onClick={handleLogOut} color="inherit">Logout</Button>}
                                <Link to={'/cart-item'}><Button color="inherit">
                                    <Badge badgeContent={products.length} color="secondary">
                                        <i className='fa-solid text-xl fa-shopping-cart'></i>
                                    </Badge>
                                </Button></Link>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Header