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
import { useUser } from '@clerk/clerk-react';

export default function App() {

  const user = useUser()
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const dispatch = useDispatch()

  const onLoginClick = () =>{
    setIsLoginModalOpen(true)
  }

  useEffect(()=>{
    dispatch(getProductsData())

  },[dispatch])
 
  return (
    <div className='min-h-screen bg-background'>
      <Header user={user} onLoginClick={onLoginClick}/>
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
      {isLoginModalOpen?<LoginModal  isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        />:null}
      <Footer/>
      <Toaster position="bottom-right" />
    

    </div>
  )
}