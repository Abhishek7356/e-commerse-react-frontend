import { Route, Routes } from 'react-router-dom';
import './App.css';
import Announcement from './components/Announcement';
import Footer from './components/Footer';
import Header from './components/Header';
import CartList from './pages/CartList';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Orders from './pages/Orders';

function App() {

  const user = useSelector((state) => state.userReducer.user);
  console.log(user)

  const Redirection = ({ children }) => {
    if (!user) {
      return <Login />
    } else {
      return children
    }
  }

  return (
    <div className="">
      <Announcement />
      <Header />
      <Routes>
        <Route path='/login' element={<Redirection><Home /></Redirection>} />
        <Route path='/register' element={< Register />} />
        <Route path='/' element={<Redirection>< Home /></Redirection>} />
        <Route path='/cart-item' element={<Redirection>< CartList /></Redirection>} />
        <Route path='/success/:id' element={<Redirection>< Success /></Redirection>} />
        <Route path='/cancel' element={<Redirection>< Cancel /></Redirection>} />
        <Route path='/orders' element={<Redirection>< Orders /></Redirection>} />
        <Route path='/all-product/:cat' element={<Redirection>< ProductList /></Redirection>} />
        <Route path='/product/:id' element={<Redirection>< ProductDetails /></Redirection>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
