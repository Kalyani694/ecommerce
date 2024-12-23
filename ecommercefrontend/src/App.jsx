import { useEffect, useState } from 'react'
import SellerLogin from './components/seller/SellerLogin'
import SellerRegister from './components/seller/SellerRegister'
import SellerLogout from './components/seller/SellerLogout'
import SellerVerify from './components/seller/SellerVerify'
import UserRegister from './components/Users/UserRegister'
import UserLogin from './components/Users/Userlogin'
import CreateProduct from './pages/CreateProdux'
import ProductList from './pages/ProductList'
import SingleProduct from './components/SingleProduct'
import UpdateVisibility from './components/UpdateVisibility'
import Product from './components/Product'
import UpdateStock from './components/seller/UpdatetheStoke'
import CouponManage from './components/CouponManage'
import ComplainForm from './components/Users/CompalinForm'
import ComplainList from './components/seller/ComplainList'
import API from './service/api'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import Announcement from './components/Anoucement'
import Layout from './pages/Layout'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Checkout from './components/Checkout'
import FindOrder from './components/Users/FindOrder'


function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/list",
          element: <ProductList />,
         
        },
        {
          path: "/:id",
          element: <Product/>,
         
        },

        {
          path: "/login",
          element: <UserLogin/>,
        },
        {
          path: "/register",
          element: <UserRegister />,
        },
        {
          path:"/sellerLogin",
          element:<SellerLogin/>,
        },
        {
          path:"/sellerRegister",
          element:<SellerRegister/>
        },
        {
          path:"/sellerLogout",
          element:<SellerLogout/>
        },
        {
          path: "/cart",
          element:<Cart/>
        },{
          path:"/product/:productId",
          element:<SingleProduct/>
        },
        {
          path:"/checkout",
          element:<Checkout/>
        },{
          path:"/findOrder",
          element:<FindOrder/>
        }
      ],
    },
  ]);

  return (
   <RouterProvider router={router}/>
  )
}

export default App

