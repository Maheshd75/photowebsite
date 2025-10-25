import { useEffect, useState } from 'react';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { ProductGrid } from './components/ProductGrid.jsx';
import { ProductDetails } from './components/ProductDetails.jsx';
import { CategoryPage } from './components/CategoryPage.jsx';
import { CartPage } from './components/CartPage.jsx';
import { Cart } from './components/Cart.jsx';
import { Footer } from './components/Footer.jsx';
import { LoginModal } from './components/LoginModal.jsx';
import { UserProfile } from './components/UserProfile.jsx';
import { OrdersPage } from './components/OrdersPage.jsx';
import { toast, Toaster } from 'sonner';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import { AdminPanel } from './Pages/AdminPanel.jsx';
import { useDispatch } from 'react-redux';
import { getProductsData } from './features/productSlice.js';
import { useAuth, useClerk, useUser } from '@clerk/clerk-react';
import { fetchUser } from './features/userSlice.js';
import { getCartData } from './features/cartSlice.js';
import { getOrdersData } from './features/orderSlice.js';

export default function App() {

  const {user} = useUser()
  const { getToken } = useAuth()
  
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  

  const dispatch = useDispatch()

  const fetchData = async () =>{
    
      const token = await getToken()
      dispatch(fetchUser(token)) 
      dispatch(getCartData(token))
      dispatch(getOrdersData(token))
    
  }

  useEffect(()=>{
    
    dispatch(getProductsData())
    fetchData()

  },[])
 
  return (
    <div className='min-h-screen bg-background'>
      <Header user={user}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collections' element={<CategoryPage/>}/>
        <Route path='/product/:productId' element={<ProductDetails/>}/>
        <Route path='/about' element/>
        <Route path='/contact' element/> 
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/orders' element={<OrdersPage/>}/>
        <Route path='/admin' element={<AdminPanel/>}/>
      </Routes>
      
      <Footer/>
      <Toaster position="bottom-right" />
    

    </div>
  )
}