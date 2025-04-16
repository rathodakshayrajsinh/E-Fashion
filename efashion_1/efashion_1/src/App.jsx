import { React, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./assets/adminlte.css"
import "./assets/adminlte.min.css"
import UserSidebar from './components/layouts/UserSidebar'
import { Route, Routes, useLocation } from 'react-router-dom'


import ProductForm from './components/seller/ProductForm'
import Signup from './components/common/Signup'
import Login from './components/common/Login'
import axios from 'axios'

import AdminHome from './components/admin/Home'
import PrivateRoutes from './hooks/PrivateRoutes'
import SellerSidebar from './components/layouts/SellerSidebar'


import SellerProductDetails from './components/seller/SellerProductDetails'
import ProductList from './components/seller/ProductList'
import SellerDashboard from './components/seller/SellerDashboard'
import OrderList from './components/seller/OrderList'
import UserDashboard from './components/user/UserDashboard'
import UserCart from './components/user/UserCart'
import PaymentPage from './components/user/PaymentPage'
import Order from './components/user/Order'
import UserProfileDetails from './components/user/UserProfileDetails'
import Categories from './components/user/Categories'
import LandingPage from './components/common/LandingPage'
import AboutUs from './components/pages/AboutUs'
import Services from './components/pages/Services'
import ContactUs from './components/pages/ContactUs'
import Wishlist from './components/user/WishList'

import HomePage from './components/pages/HomePage'
import { ResetPassword } from './components/common/ResetPassword'
import SellerProfileDetails from './components/seller/SellerProfileDetails'
import Admindashboard from './components/admin/AdminDashboard'




//import './App.css'

function App() {
  axios.defaults.baseURL = "http://localhost:4000"
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = ""; // Remove the unwanted class for login and signup
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);

  return (
    <div className={location.pathname === "/login" || location.pathname === "/signup" ? "" : "app-wrapper"}>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/payment" element={<PaymentPage />} />
         <Route path="/" element={<LandingPage />} />
         <Route path="/about" element={<AboutUs />} />
         <Route path="/services" element={<Services />} />
         <Route path="/contact" element={<ContactUs />} />
         <Route path="/homepage" element={<HomePage />} />
        
   
         <Route path="/admin/dashboard" element={<Admindashboard />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="" element={<PrivateRoutes />}>

          <Route path="/user" element={<UserSidebar />} >
            <Route path="userdashboard" element={<UserDashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="userorder" element={<Order />} />
            <Route path="usercart" element={<UserCart/>}/>
            <Route path="profile" element={<UserProfileDetails />} />
            <Route path="wishlist" element={<Wishlist />} />

          </Route>
          <Route path="/seller" element={<SellerSidebar />} >
            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="productlist" element={<ProductList />} />
            <Route path="product/:id" element={<SellerProductDetails />} />
            <Route path="product" element={<ProductForm />} />
            <Route path="order" element={<OrderList/>}/>
            <Route path="sellerprofile" element={<SellerProfileDetails/>}/>
            
          </Route>

        </Route>
      </Routes>
    </div>

  )
}

export default App
