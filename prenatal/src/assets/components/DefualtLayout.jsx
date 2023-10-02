/* eslint-disable react/prop-types */
import {  Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import {  useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import CardCarousel from "../card-carousel";
import Header from "../header";
import Footer from "../footer";
import Nav from "../former-navbar";
import Subscription from "../subscriber-section";
import Filter from "../filter";
import DisplayCards from "../displayCards";
import filterColore from "../filterFunctionss";
import filterMarche from "../filterFunctionss";
import filterPrice from "../filterFunctionss";


export default function DefaultLayout(){

  const {token, setUser} = useStateContext()
  const [cards, setCards] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMarche, setSelectedMarche] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(2605);

  const [filterCurrentPage, setFilterCurrentPage] = useState(1);
  const [filterLastPage, setFilterLastPage] = useState(2605);

  const [carouselProduct, setCarouselProduct] = useState([]);


  const [children, setChildren] = useState({});

  const [coloredfilteredProucts, setcoloredfilteredProucts] = useState([]);
  const [marcheFilteredProducts, setMarcheFilteredProducts] = useState([]);
  const [priceFilteredProducts, setPriceFilteredProducts] = useState([]);

  const [coloreFilteredChildren, setColoreFilteredChildren] = useState([]);
  const [marcheFilteredChildren, setMarcheFilteredChildren] = useState([]);
  const [priceFilteredChildren, setPriceFilteredChildren] = useState([]);

  const [isCardOrderd, setIsCardOrdered] = useState(false);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }


  useEffect(()=>{
    if(selectedPrice){
      filterPrice.filterPrice(selectedPrice, filterCurrentPage, setPriceFilteredProducts, setPriceFilteredChildren
        ,setFilterCurrentPage,setFilterLastPage);
    }
  }, [filterCurrentPage, selectedPrice])

  useEffect(()=>{
    if(selectedMarche){
      filterMarche.filterMarche(selectedMarche,filterCurrentPage, setMarcheFilteredProducts, setMarcheFilteredChildren,
        setFilterCurrentPage,setFilterLastPage);
    }
   
  },[filterCurrentPage, selectedMarche])


  useEffect(()=>{
    if(selectedColor){
      filterColore.filterColore(selectedColor, filterCurrentPage,setcoloredfilteredProucts,
        setColoreFilteredChildren,setFilterCurrentPage, setFilterLastPage);
    }
  },[filterCurrentPage, selectedColor])

  useEffect(()=>{ //after the page is rendered it executes all the code inside this component function
    window.addEventListener('resize',handleResize);

    return () => { //cleanup function
       // Remove the event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    }
  },[]) //here react checks the dependencies array. If its empty means the effect should run only once, right after initial rending
//If there are dependencies list in the array, the react will compare them with their previous values and execute the effect
//if any of the dependencies have changed

  useEffect(()=>{
    if(token){
      axiosClient.get('/user')
    .then(({data})=>{
      // console.log(data)
      setUser(data)
    })
    }
  })

  useEffect(()=>{
    axiosClient.get('/carouselProduct')
    .then((response)=>{
      setCarouselProduct(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[]);

  useEffect(()=>{
    axiosClient.get(`/products?page=${currentPage}`)
      .then((response)=>{
        console.log(`/products?page=${currentPage}`)
        // console.log('cards',response.data.cards.data)
        setCards(response.data.cards.data);
        console.log('cards', response.data.cards.data);
        console.log('children',response.data.childrens)
        setChildren(response.data.childrens)
        setCurrentPage(response.data.cards.current_page);
        setLastPage(response.data.cards.last_page);
      })
      .catch((error)=>{
        console.log(error);
      });
  },[currentPage])



  return (
    
    <div id="defaultLayout">
    <div className="content">


      <header>
      <Header
      
        windowWidth={windowWidth}
        
        isCardOrderd={isCardOrderd}
      />
        </header>


        <div className="flex flex-col justify-between">
        <div className="first-class-section flex justify-between p-10 relative">
        
        <div className="pink-card-container">
          <div className="pink-card ml-10 h-fit">
            <p className="pink-card-text text-white font-thin p-2">Passegini</p>
            <h1 className="pink-card-text text-white font-bold p-2">IMIGLIORPASSEGINIPER LE VOSTRE PASSEGIATE</h1>
            <p className="pink-card-text text-white font-thin p-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </div>
          </div>
          
          {windowWidth <= 1029 ? (
            
            <div className="relative">
            <CardCarousel cards={Object.values(carouselProduct)} />
            </div>
            
          ) :(Object.values(carouselProduct).map((card) => (
                <div key={card.id} className="card-body m-3 p-3">
                
                    <div className="flex flex-row">
                    <img className="card-image w-48 h-auto" src={card.image_link}></img>
                    <div className="card-head-text flex-col ml-3 mt-32">
                      <h2 className="text-center font-bold text-pink-600">{card.price}</h2>
                      <h2 className="font-bold text-center">{card.title}</h2>
                    </div>
                  </div>
                  <div className="card-description-text mt-4">
                    <p className="p-2">{card.description}</p>
                  </div>
          </div>
          
          ))) }
        </div>
        

        <div className="filter-recommended-cards-div pl-16 pr-16">
        <Filter
          selectedColor={selectedColor}
          selectedMarche={selectedMarche}
          selectedPrice={selectedPrice}
          setSelectedColor={setSelectedColor}
          setSelectedPrice={setSelectedPrice}
          setSelectedMarche={setSelectedMarche}
          cards={cards}
          setFilterCurrentPage={setFilterCurrentPage}
          setFilterLastPage={setFilterLastPage}
          />

          <DisplayCards
            lastPage={lastPage}
            currentPage={currentPage}
            filterLastPage={filterLastPage}
            childrenn={children}
            coloredfilteredProucts={coloredfilteredProucts}
            marcheFilteredProducts={marcheFilteredProducts}
            priceFilteredProducts={priceFilteredProducts}
            coloreFilteredChildren={coloreFilteredChildren}
            marcheFilteredChildren={marcheFilteredChildren}
            priceFilteredChildren={priceFilteredChildren}
            setIsCardOrdered={setIsCardOrdered}
            setCurrentPage={setCurrentPage}
            filterCurrentPage={filterCurrentPage}
            setFilterCurrentPage={setFilterCurrentPage}
            isCardOrderd={isCardOrderd}
            selectedColor={selectedColor}
            selectedMarche={selectedMarche}
            selectedPrice={selectedPrice}
            cards={cards}
            />
        </div>
        </div>

      <Nav />

      <section>
        <Subscription />
      </section>

      <footer>
      <Footer />
      </footer>
      
      <main>
        <Outlet />
      </main>
    </div>
    </div>
    
  )
}
