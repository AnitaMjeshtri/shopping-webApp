import {createBrowserRouter, Navigate} from 'react-router-dom';
import Login from './views/Login.jsx';
import Signup from './views/signup';
import NotFound from './views/NotFound.jsx';
import DefaultLayout from './assets/components/DefualtLayout.jsx';
import GuestLayout from './assets/components/GuestLayout.jsx';
import Dashboard from './views/Dashboard.jsx';
import Products from './views/Products.jsx';
import ProductDetails from './views/ProductDetails.jsx';
import Search from './views/SearchBar.jsx';
import CategoryProductsInfo from './views/CategoryPage.jsx';
// import Categories from './views/DefaultCategoryPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/products" />
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  },
  {
    path: '/products/search',
    element: <Search />
  },
  {
      path: '/products/:productId/',
      element: <ProductDetails />
  },
  {
      path: '/category/:RoutePath',
      element: <CategoryProductsInfo/>,
      // children: [
      //   {
      //     path: ':categoryId',
      //     element: <CategoryProductsInfo />
      //   },
      // ]
  
  },
  {
    path: '/',
    element: <GuestLayout />, 
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router;