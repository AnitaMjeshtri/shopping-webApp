/* eslint-disable react/prop-types */
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarouselAlice from "../assets/search-carousel";
import Transitions from "../assets/components/Transitions";
import addToCart from "../assets/AddToCard";

export default function Search(){

  const [searchResult, setSearchResult] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [children, setChildren] = useState([]);
  const [isClicked, setIsClicked] = useState(false);


  useEffect(()=>{
    document.body.style.overflow = "hidden";

    return() => {
      document.body.style.overflow="auto";
    };
  }, [])


  const performSearch = () => {
    console.log('perform search at header called')
    axiosClient.get(`/search?query=${searchQuery}`)
      .then((response) => {
        console.log('url', `/products?query=${searchQuery}`)
        const searchResult = response.data.filtered; 
        setChildren(response.data.filteredChildrens);
        setSearchResult(searchResult);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getChildrenPrice = (product_id) => {

    let childrenPrices = {};
    for(const child of children){
      if(child.parent_id === product_id){
        childrenPrices[product_id] = {
          price: child.price,
          vip_price: child.vip_price
        }
      }
      
    }
    
    return childrenPrices;
  }

  const handleSearch = () => {
    performSearch();
  }

  const getChild = (card) => {
    for(const child of children){
      if(child.parent_id === card.product_id){
        return child;
      }
    }
    return null;
  }
  return (
    <Transitions >
    <div>
    <div className="search-clicked-container flex ml-10 mr-10 mb-8">
    <div className="flex justify-center align-items-center mt-4 mr-4">
      <img className="header-logo w-28 h-auto" src="/images/prenatalIcon.jpg" alt="icon" />
    </div>
    <div className="search-clicked">
      <div className="search-container">
      <MDBCol md="max" className="search">
        <MDBFormInline className="search-form md-form mt-3 ml-3 mr-3 border-bottom rounded-0 border-black p-0">
          <MDBIcon icon="search mt-3 cursor-pointer hover:text-pink-600" />
          <input
            className="form-control form-control-sm border-0 rounded-0"
            type="text"
            value={searchQuery}
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
                setIsClicked(!isClicked)
              }
            }}
            
          />
        <Link to='/products' className=" flex justify-center align-items-center">
          <MDBIcon icon=' fa-solid fa-x cursor-pointer' />
        </Link>
        </MDBFormInline>
      </MDBCol>
      
      </div>
    </div>
    </div>
    <div className={`recommended-card-div flex flex-wrap mb-10 px-4 ${searchQuery ? 'h-screen overflow-y-auto' : ''} `}>
      {searchQuery && searchResult.map((card) => (
        <div key={card.id} className="recommended-card-body-searched border-1 hover:border-pink-600 m-2 flex-col bg-white lg:w-1/4 md:w-1/3 sm:w-1/2">
          <div className="image-div border-3 border-solid">
            <img src={card.image_link} alt="image" />
          </div>
          <div className="flex-col p-3">
          <div className="h-38">
            <div className="h-24">
                <div className="flex justify-center align-items-center">
                  <h2 className="font-thin">{card.marche}</h2>
                </div>
                <h2 className="mb-4">{card.title}</h2>
              </div>
              <div className="h-14">
                <h2 className="text-black font-bold mb-2"><i className="fa-solid fa-euro-sign"></i>{card.price ? card.price : getChildrenPrice(card.product_id)[card.product_id].price}</h2>
                <div className="flex">
                  <p className='font-bold text-pink-600 text-sm mr-2'>&nbsp;VIP Club</p>
                  <h2 className="text-pink-600 font-bold"><i className="fa-solid fa-euro-sign"></i>{getChildrenPrice(card.product_id)[card.product_id] ? getChildrenPrice(card.product_id)[card.product_id].vip_price : <></>}</h2>
                </div>
              </div>
              </div>
              <div className="flex justify-end">
                <div className="flex">
                  <button onClick={() => {card.price ? addToCart(card) : (getChild(card) ? addToCart(getChild(card)) : '') }} className={`addToCart bg-pink-100 hover:bg-pink-300 rounded-xl px-2 py-2 mt-2 ${  card.stock || (getChild(card) && getChild(card).stock) > 0 ? '' : 'disable'}`}><img src='/public/images/shopping-icon.png'/></button>
                </div>
              </div>
            </div>
        </div>
      ))}{(!isClicked || !searchQuery) &&
        <CarouselAlice/>}
      </div>
    </div>
    </Transitions>
  )
}