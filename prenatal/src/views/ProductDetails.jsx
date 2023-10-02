import { useLocation, useParams } from 'react-router-dom';
import Header from '../assets/header';
import Nav from '../assets/former-navbar';
import Subscription from '../assets/subscriber-section';
import Footer from '../assets/footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function ProductDetails(){

  const location = useLocation();
  const {childrenProduct} = location.state || {};
  const {productId} = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [productDetails, setProductDetails] = useState([]);
  const [productGallery, setProductGallery] = useState([]);
  // console.log(productId)

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(()=>{
    window.addEventListener('resize',handleResize);

    return () => { 
      window.removeEventListener('resize', handleResize);
    }
  },[])


  useEffect( ()=>{
    const apiUrl = `http://localhost:8000/api/products/${productId}`;
    // console.log(apiUrl)
    axios.get(apiUrl)
    .then((response)=>{
      console.log('price ',response.data.product.price);
      // console.log('taglia',tagliaProduct)
      setProductDetails(response.data.product);
      setProductGallery(response.data.gallery);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[productId])

  
  return (

    <div className='content'>
    
    
    <header>
    <Header
    windowWidth={windowWidth}
    setWindowWidth={setWindowWidth}
    />
      {/* {productId} */}
    </header>


    <div className='product-card flex p-5'>
        <div className='card-images flex flex-wrap m-2'>
            {productGallery.map((product) => (
              <div key={product.id} className='lg:w-1/2 md:w-1/3 sm:w-1/2 p-2 '>
              <img className='border-1 border-gray-300' src={product.image_link} alt={`Product ${product.id}`} />
              </div>
            ))}
          
        </div>
        <div className='card-details-container m-2'>
            <div className='card-details'>
            <h2 className='marche text-xl font-bold'>{productDetails['marche']}</h2>
                <h1 className='text-pink-600 border-bottom border-green-800 text-3xl font-bold'>{productDetails['price'] ? productDetails['price'] : childrenProduct ? childrenProduct.price : <></>}</h1>
                <hr className='vip'></hr>
                <h1 className="vip text-3xl font-bold">{productDetails['vip_price'] ? productDetails['vip_price'] : childrenProduct ? childrenProduct.vip_price : <></>}</h1>
            </div>
            <div className='card-details-description mt-2'>
              <p className='my-4 text-sm'>{productDetails['title']}</p>
              <p>{productDetails['description']}</p>
            </div>
            
            <div className='occassionieasy mt-3 p-7'>
              <div className='flex'><i className="fa-solid fa-circle-exclamation"></i> &nbsp;&nbsp;<p className='font-bold text-xl text-pink-600'>OCCASSIONIEASY</p></div>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s</p>
            </div>
        </div>
    </div> 


    <Nav />

    <section>
      <Subscription />
    </section>

    <footer>
    <Footer />
    </footer>
    </div>
  )
}