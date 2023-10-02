/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import ImageCarousel from "./image-carousel";
import { Link } from "react-router-dom";
import addToCart from "./AddToCard";

export default function DisplayCards({lastPage,currentPage, filterLastPage, childrenn
            ,coloredfilteredProucts, marcheFilteredProducts, priceFilteredProducts
            ,coloreFilteredChildren, marcheFilteredChildren, priceFilteredChildren, setIsCardOrdered
            ,setCurrentPage,filterCurrentPage,setFilterCurrentPage, isCardOrderd,
            selectedColor, selectedMarche, selectedPrice, cards}){

  const [selectedTaglia, setSelectedTaglia] = useState({});

  const [tagliaProduct, setTagliaProduct] = useState({});

  const [images, setImages] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(-1);

  const handleNextPage = () => {
    if(currentPage < lastPage){
      setCurrentPage(currentPage+1);
    }
  }
  const handleFilterNextPage = () => {
    if(filterCurrentPage < filterLastPage){
      setFilterCurrentPage(filterCurrentPage+1);
    }
  }

  const handlePreviousPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage-1);
      // console.log(currentPage+1);
    }
  }

  const handleFilterPreviosPage = () => {
    if(filterCurrentPage > 1){
      setFilterCurrentPage(filterCurrentPage-1);
    }
  }
  const handleTagliaChange = (e, productId, parentId) => {
    setSelectedTaglia((prevSelectedTaglia) => ({
      ...prevSelectedTaglia,
      [productId]: e,
    }));

    const encodedTaglia = encodeURIComponent(e);
    const url = `http://localhost:8000/api/products/${parentId}/${encodedTaglia}`;
    axios.get(url)
    .then((response)=>{

      setTagliaProduct((prevTagliaProduct)=>({
        ...prevTagliaProduct,
        [productId]:response.data,
      })); 
          })
    .catch((error)=>{
      console.log(error);
    })
  };

  const handleMouseEnter = (productId, index) => {
    const apiUrl =`http://localhost:8000/api/products/${productId}/images`

    axios.get(apiUrl)
    .then((response)=>{

      setImages(response.data.gallery);
      setIsHovered(true);
      setCarouselIndex(index); 
      console.log(response.data.gallery);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCarouselIndex(-1);
    // setTagliaIndex(-1);
    // setSelectedTaglia([]);
  }

  const parsedString = ({card}) => {
    const tagliaArray = card.taglia.split(',');
    return tagliaArray;
  }
  
  const getChildrenPrice = (product_id, childrens) => {

    let childrenPrices = {};
    for(const child of childrens){
      if(child.parent_id === product_id){
        childrenPrices[product_id] = {
          price: child.price,
          vip_price: child.vip_price
        }
        // console.log(childrenPrices[product_id].vip_price)
      }
      
    }
    
    return childrenPrices;
  }

  const fetchProducts = (allCards, childrens) => {
    return (
      Object.values(allCards).map((card) => (
        <div key={card.id} className="recommended-card-body flex-col bg-white lg:w-1/4 md:w-1/3 sm:w-1/2"
        onMouseEnter={() => handleMouseEnter(card.id, card.id)}
        onMouseLeave={handleMouseLeave}>

        
            <div className="image-div border-3 border-solid ">
            {isHovered && carouselIndex === card.id ? (
              <ImageCarousel products={images} card={card}/>
            ) : (<img className="image-div-img" src={card.image_link} alt="image"></img>
            )}
              
            </div>
            <Link to={`/products/${card.id}`}
            state={{ childrenProduct: getChildrenPrice(card.product_id, childrens)[card.product_id]}}>
            <div className="flex-col p-3">
              
              <div className="flex justify-around">
              <h2 className="text-pink-600 font-bold">{card.price ? card.price : getChildrenPrice(card.product_id, childrens)[card.product_id].price}</h2>
              {/* <h2 className="text-pink-600 font-bold">{card && card.price ? card.price : getChildrenPrice(card?.product_id, childrens)[card?.product_id]?.price}</h2> */}

              <div className="flex align-items-center justify-center">
              <hr className='h-line w-14 text-black '></hr>
              </div>
              <div className="flex align-items-center justify-evenly">
                <h2 className="text-pink-600 font-bold mr-2">{getChildrenPrice(card.product_id, childrens)[card.product_id] ? getChildrenPrice(card.product_id, childrens)[card.product_id].vip_price : <></>}</h2>
                <p className='vip-text font-light text-xs '> <i className="vip-exl fa-solid fa-circle-exclamation"></i>&nbsp;con vip card</p>
              </div>
              </div>
              <h2 className="font-thin">{card.marche}</h2>
              <h2>{card.title}</h2>
            </div>
            </Link>
            <div className="on-hover-content">
              <p className="disponible">DISPONIBLE ONLINE</p>
              <div className="on-hover-buttons">
              <select className="border-1 border-pink-600 rounded-xl p-2 text-pink-600"
                onChange={(e)=>handleTagliaChange(e.target.value, card.id, card.parent_id)
              
              }
              value={selectedTaglia[card.id]}>
              <option value="" selected disabled className={`select ${selectedTaglia[card.id] ? 'disable' : ''}`}>SELEZIONA UNA TAGLIA</option>
            
                {parsedString({card}).map((el)=>(
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </select>
              <button onClick={() => {card.price ? addToCart(card) : addToCart(tagliaProduct[card.id][0]), setIsCardOrdered(!isCardOrderd)}} className={`addCart rounded-xl px-4 py-2 mt-2 ${ tagliaProduct[card.id] && tagliaProduct[card.id][0] && tagliaProduct[card.id][0].stock > 0 || (card.price && card.stock > 0) ? '' : 'disable'}`}>AGGIUNGI AL CARRELO</button>
            </div>
            </div>
          </div>
      )
    )
    )
  }
  return (
    <>   
    <div className="filtered-recommended-div flex flex-wrap mb-3">
      {selectedColor
        ? (fetchProducts(coloredfilteredProucts, coloreFilteredChildren)) : <></>}
        {selectedMarche ? (
          fetchProducts(marcheFilteredProducts, marcheFilteredChildren)
        ) : <></> }
        {selectedPrice ? (
          fetchProducts(priceFilteredProducts, priceFilteredChildren)
        ): <></>}
    </div>
    
    <div className="recommended-card-div flex flex-wrap  mb-10">
    {( !selectedColor && !selectedMarche && !selectedPrice) ? (fetchProducts(cards, childrenn)) : <></>}
    </div>
    <div className="flex justify-center">
            <button onClick={(selectedColor || selectedMarche || selectedPrice) ? handleFilterPreviosPage : handlePreviousPage} disabled={ selectedColor ? filterCurrentPage ===1 : currentPage === 1} className="p-5">
            <i className="fa-solid fa-chevron-left text-pink-600 font-bold text-3xl"></i>
            </button>
            <button onClick={(selectedColor || selectedMarche || selectedPrice) ? handleFilterNextPage : handleNextPage} disabled={selectedColor ? filterCurrentPage === filterLastPage : currentPage === lastPage} className="p-5">
            <i className="fa-solid fa-chevron-right text-pink-600 font-bold text-3xl"></i>
            </button>
        </div>
    </>
  )
}