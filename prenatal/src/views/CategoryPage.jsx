import { useEffect, useState } from "react";
import Header from "../assets/header";
import Nav from "../assets/former-navbar";
import Subscription from "../assets/subscriber-section";
import Footer from "../assets/footer";
import axiosClient from "../axios-client";
import { useLocation } from "react-router-dom";
import Filter from "../assets/filter";
import DisplayCards from "../assets/displayCards";
import filterColore from "../assets/filterFunctionss";
import filterMarche from "../assets/filterFunctionss";
import filterPrice from "../assets/filterFunctionss";

export default function CategoryProductsInfo(){

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const {categoryRoute} = location.state || {};
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMarche, setSelectedMarche] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [filterCurrentPage, setFilterCurrentPage] = useState(1);
  const [filterLastPage, setFilterLastPage] = useState(225);
  const [cards, setCards] = useState([]);
  const [children, setChildren] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(225);
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
    window.addEventListener('resize',handleResize);

    return () => { 
      window.removeEventListener('resize', handleResize);
    }
  },[])



  useEffect(()=>{
    axiosClient.get(`/categoryProducts/${(categoryRoute.substr(1,categoryRoute.length-1))}?page=${currentPage}`)
    .then((response)=>{
      console.log('current_page', response.data.products.current_page)
      console.log('categories',response.data.categories);
      console.log('products',response.data.products);
      console.log('children', response.data.childrens);
      setCards(response.data.products);
      setChildren(response.data.childrens);
      setCurrentPage(response.data.categories.current_page);
      setLastPage(response.data.categories.last_page);
    })
    .catch((error)=>{
      console.log(error);
    })
  }, [currentPage, categoryRoute])

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

  return (
    <div className="categoryPage-container">
    <header>
      <Header
        windowWidth={windowWidth}
        isCardOrderd={isCardOrderd}
      />
    </header>


    <Nav />

    <div className="filter-recommended-cards-div pl-16 pr-16">
      <Filter
      selectedColor={selectedColor}
      selectedMarche={selectedColor}
      selectedPrice={selectedPrice}
      setSelectedColor={setSelectedColor}
      setSelectedMarche={setSelectedMarche}
      setSelectedPrice={setSelectedPrice}
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


    <section>
      <Subscription />
    </section>

    <footer>
    <Footer />
    </footer>


    </div>
  )
}