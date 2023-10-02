import { useEffect, useState } from "react";
import SearchPage from "./searchBar";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
function Header({isCardOrderd, windowWidth}){


const [showDropdown, setShowDropdown] = useState(false);
const [isNavOpen, setIsNavOpen] = useState(false);
const [isOrdersOpen, setIsOrdersOpen] = useState(false);
const {user,token, setUser, setToken} = useStateContext();
const [categories, setCategories] = useState([]);
const [subCategory, setSubCategory] = useState([]);
const [subCategory3, setSubCategory3] = useState([]);
const [showSubCategories, setShowSubCategories] = useState(false);
const [showSubCategoriesSmallScreen, setShowSubCategoriesSmallScreen] = useState(false);
const [isXclicked, setIsXclicked] = useState(false);
const [categoryRoute, setCategoryRoute] = useState({});
const [prevClickedCategory, setPreviousClickedCategory] = useState(null);
const [isLoading, setIsLoading] = useState(false);


  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  }

  useEffect(()=>{
    if(isNavOpen){
      document.body.style.height = '100%';
      document.body.style.overflowY = 'hidden';
    }else{
      document.body.style.height = 'auto';
      document.body.style.overflowY = 'auto';
    }
    
  },[isNavOpen])


  const onLogout = (event) => {
    event.preventDefault();

    axiosClient.post('/logout')
      .then(()=>{
        setUser({})
        setToken(null)
      })
  }

  useEffect(()=>{
    axiosClient.get('/categories')
    .then((response)=>{
      setCategories(response.data.categories);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])


  const toggleSubCategories = () => {
      setShowSubCategories(true);
  }

  const toggleSubCategoriesSmallScreen = () => {
    setShowSubCategoriesSmallScreen(true);
  }

  const fetchCategories = async (categoryName) => {
    setIsLoading(true);
    await axiosClient.get(`/categories/${categoryName}`)
    .then((response)=>{
      const sub2 = response.data.secondRows
      setSubCategory(sub2);
      const sub3 = response.data.thirdRows
      setSubCategory3(sub3);
      setCategoryRoute(response.data.route);
      console.log('route', response.data.route);
      setIsLoading(false);
    })
    .catch((error)=>{
      setIsLoading(false);
      console.log(error);
    })

    
  }


  const [cartItems, setCartItems] = useState([]);

  useEffect(()=>{
    const storedCarts = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCarts);
  },[isCardOrderd])

  const handleQuantityChange = (productId,productStock, newQuantity) => {

    newQuantity = Math.max(0, newQuantity);
    const updatedCartItems = cartItems.map((item)=>{
      if(item.id === productId){
        if(productStock >= newQuantity){
          return {...item, quantity: newQuantity};
        }else{
          console.log('no stock')
          return {...item};
          
        }
      }
      return item;
    });
    setCartItems(updatedCartItems);

    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  }

  const removeItem = (productId) => {
    const updatedCartItems = cartItems.filter((item)=>item.id !== productId);
    setCartItems(updatedCartItems);

    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  }

  const getQuantity = (cartItems) => {
    let quantity = 0;
    cartItems.map((card)=>{
      quantity += card.quantity;
    })
    // console.log(quantity)
    return quantity;
  }

  const getPrice = (cartItems) => {
    let price = 0;
    cartItems.map((card)=>{
      price += (card.quantity*card.price);
    })
    return price.toFixed(3);
  }

  const getVipPrice = (cartItems) => {
    let vip = 0;
    cartItems.map((card)=>{
      vip += (card.quantity*card.vip_price);
    })
    return vip.toFixed(3);
  } 

  const shopping = () => {
    return (
      <><button onClick={()=>{setIsOrdersOpen(!isOrdersOpen)}}><img className="w-8 hover:bg-gray-100 p-1" src='../public/images/shop.png' /><p className="quantity-icon">{getQuantity(cartItems)}</p>{/*<i className="header-icon fa-brands fa-shopify text-2xl"></i>*/}</button>
      
      <div className={`${isOrdersOpen ? 'open' : 'hidden'} order-div`}> 
      <p className="text-pink-600 font-bold">Il tuo carrello ({getQuantity(cartItems)})</p>
      {isOrdersOpen && (cartItems.map((order)=>(<>
        <div key={order.id} className="flex ">
        <img src={order.image_link} className="order-image"/>
        <div className="flex-col ml-2">
        <div className="flex font-thin mb-4">
          <p>{order.title} - </p>
          <p>{order.taglia}</p>
        </div>
        
        <div className="flex">
        <button onClick={()=>handleQuantityChange(order.id, order.stock, order.quantity-1)} className="plus hover:bg-gray-200 px-1"><i className="fa-solid fa-minus"></i></button>
        <input
          value={order.quantity}
          onChange={(e)=>handleQuantityChange(order.id ,order.stock, parseInt(e.target.value))}
          className="border-solid border-1 w-10 flex align-items-center justify-center text-center">
        </input>
        <button onClick={()=>handleQuantityChange(order.id, order.stock, order.quantity+1)} className="plus hover:bg-gray-200 px-1"><i className="fa-solid fa-plus"></i></button>
        <button onClick={()=>removeItem(order.id)}><i className="fa-solid fa-trash-can ml-10"></i></button>
        </div>
        </div>

        
        </div>
        <div className="flex justify-end border-bottom">
          <p className="font-bold text-pink-600">{order.quantity * order.price}</p>
        </div>
        </>
      )))}
      <div className="flex justify-between">
          <p className="font-medium text-sm">Spedizione:</p>
          <p className="font-bold text-pink-600 text-sm">GRATIS</p>
      </div>

      <div className="flex justify-between">
        <p className="font-medium text-sm">TOTALE:</p>
        <p className="font-bold text-xl text-pink-600"><i className="fa-solid fa-euro-sign"></i>&nbsp;{getPrice(cartItems)}</p>
      </div>

      <div className="flex justify-between">
      <p className="vip">Risparmio con VIP CARD:</p>
      <p className="vip"><i className="fa-solid fa-euro-sign"></i>&nbsp;{getVipPrice(cartItems)}</p>
      </div>

      </div>
      </>
    )
  }


  const createDictionary = () => {
    let categoriesDict = {};
    Object.values(subCategory).map((category2)=>{
      Object.values(subCategory3).forEach((category3)=>{
        if(category2.category_id === category3.parent_id){
          // console.log('cat2Name', category2.name)
          if(!categoriesDict[category2.name]){
            categoriesDict[category2.name] = []
          }
          categoriesDict[category2.name].push(category3.name);
        }
      })
    })
    return categoriesDict;
  }
  
 
  const displayNavCategories = () => {
    const categoriesDict = createDictionary();
    const allKeys = Object.keys(categoriesDict);
    console.log('sub2',subCategory)
    console.log('sub3', subCategory3)
    console.log('called');
    return (
        <>
        {isNavOpen && showSubCategoriesSmallScreen ?
        <div>
          <button onClick={()=>setShowSubCategoriesSmallScreen(false)}><i className="fa-solid fa-chevron-left text-white flex flex-left"></i>
          </button>
        </div>  : <></>}
        <div className={`categories-container flex gap-x-6 mx-12 my-2 ${showSubCategoriesSmallScreen && 'subCategorySmall'} ${showSubCategories && !isNavOpen && 'subCategoryLarge'}`}>
      
          {allKeys.map((key) => (
            <div key={key} className={`category transition-all ease-in-out duration-300 
            ${isNavOpen ? 'category-enter-active category-enter' : 'category-exit-active'}
            ${showSubCategoriesSmallScreen && 'subCategorySmall'} ${showSubCategories && !isNavOpen && 'subCategoryLarge'}`}>
              <h2 className="font-bold py-3 px-2">{key}</h2>
              <ul className={`category-values ${isNavOpen ? 'open' : ''}`}>
                {categoriesDict[key].map((value) => (
                  <li key={value} className="category-value p-2">
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </>
      )
  };
  

  
  const ManageCategoryClick = (categoryName) => {

    if(prevClickedCategory !== categoryName){
      fetchCategories(categoryName);
      setPreviousClickedCategory(categoryName);
      // toggleSubCategories();
    }
  }

  
  return (
    <section>
    <div className="header-section border-bottom pl-16 pr-16">
    <div className="headerDiv flex justify-between">
    <div className="toggle-logo flex">
    <div className="toggle-button-div">
        <button
          className="toggle-button flex"
          onClick={toggleNav}
          aria-label="Toggle Navigation"
        >
          <i className="fa-solid fa-bars text-3xl"></i>
        </button>
        </div>
        <div className="header-logo-div flex-grow flex items-center justify-center">
       <Link to={'/products'}> <img className="header-logo w-48 h-auto" src="/images/prenatalIcon.jpg" alt="icon" /></Link>
        </div>
        <div className="shop-div mr-12">{ (shopping())}</div>
    </div>
   
      <SearchPage/>
  
  <div className="flex justify-center align-items-center">
      <ul className='nav-list flex gap-x-10 justify-center '>
        <li ><i className="header-icon fa-solid fa-location-dot text-2xl"></i> <a href="https://www.google.com/maps/place/Prenatal/@41.2830887,19.8572097,20z/data=!4m6!3m5!1s0x13503711b965de9d:0x4f1dfcdf963b78e6!8m2!3d41.2830829!4d19.857686!16s%2Fg%2F11qpqn4vd8?entry=ttu" id="position-text">Nostra posizione</a></li>
        <div className="dropdown-container">
        <li> <a href="#" onClick={()=>setShowDropdown(!showDropdown)}><i className="header-icon fa-solid fa-user text-2xl hover:bg-gray-100 p-1"></i></a></li>
        {showDropdown && (
            <div className="dropdown absolute p-3 flex flex-col justify-center text-center">
            {token ?(
              <a className="font-bold bg-pink-700 text-white p-2 rounded" href="#" onClick={onLogout}>Logout</a>
            ) : (
              <>
                <a className="font-bold bg-pink-700 text-white p-2 rounded" href="/login">ACCEDI</a>
                <p className="p-1 mt-2 text-xs">Nuovo su Prénatal? <a className="text-pink-600" href="/signup">Registrati qui</a></p>
                </>
            )}
            </div>
          )}
          </div>

        <li className="shop2">{shopping()}</li>
      </ul>
    </div>
</div>


<div className={`toggled-nav-container ${isNavOpen ? 'open' : ''}`}>
    <div className={`headerDiv2 mb-4 flex justify-between ${isNavOpen ? 'open' : 'close'}`}>
      <ul className={`headerDiv2-ul flex gap-x-6 ${isNavOpen ? 'small' : 'large'} ${showSubCategoriesSmallScreen && !isLoading ? 'show' : ''}`}>
        {Object.values(categories).map((category)=>(

          <li onClick={()=>ManageCategoryClick(category.name)} className="flex justify-between" key={category.id}>
        {prevClickedCategory === category.name && !isNavOpen && !isLoading ?
          (
            <Link to={`${categoryRoute['route']}`}
                  state={{categoryRoute: categoryRoute['route'],
                  }}>
              <button className="font-medium">{(category.name).charAt(0)+(category.name).substring(1).toLowerCase()} </button>
            </Link>
          ): <button className="font-medium" onClick={isNavOpen  ? toggleSubCategoriesSmallScreen : toggleSubCategories}>{(category.name).charAt(0)+(category.name).substring(1).toLowerCase()} </button>
          }
          <i className={`fa-solid fa-chevron-right ${isNavOpen ? '' : 'hidden'}`}></i>
          </li>
        ))}
      </ul>
    
      {showSubCategoriesSmallScreen && !isLoading &&  displayNavCategories()}
    
        <a href="#" className="prenatal-link font-bold">Tu e Prénatal</a>
            {token ?( <div className={`${isNavOpen ? 'flex justify-center mt-4 align-items-center w-full' : 'hidden'}`}>
              <a className="font-bold bg-white text-pink-700 p-2 text-center rounded w-full" href="#" onClick={onLogout}>Logout</a>
                  </div>) : (
              <div className={`${isNavOpen ? 'flex text-center flex-col justify-center mt-4 align-items-center w-full' : 'hidden'}`}>
                <a className="font-bold bg-white text-pink-700 p-2 rounded w-full" href="/login">ACCEDI</a>
                <p className="p-1 mt-2 text-xs">Nuovo su Prénatal? <a className="text-white" href="/signup">Registrati qui</a></p>
                </div>
            )}
      
    </div>


  <div className={`x-button ${isNavOpen ? 'open' : ''} `}>
      <button className="absolute ml-2 mt-2" onClick={()=>{toggleNav(), setIsXclicked(!isXclicked), setShowSubCategoriesSmallScreen(false)}}><i className=' fa-solid fa-x'></i></button>
  </div>


</div>

    
    
    <div>
    {token && user && (
<>
  {user.name}
  {/* <a href="#" onClick={onLogout} className="btn-logout">Logout</a> */}
</>
)}
    </div>
    </div>
  

      
    {(windowWidth > 1029 && !isNavOpen && showSubCategories && !isLoading && !showSubCategoriesSmallScreen ) && displayNavCategories()}
    </section>
  )



}

export default Header;