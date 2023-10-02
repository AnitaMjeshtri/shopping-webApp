import axiosClient from "../axios-client";

const filterColore = (coloreName, filterCurrentPage, setcoloredfilteredProucts, setColoreFilteredChildren
  ,setFilterCurrentPage,setFilterLastPage) => {
  console.log(`/colore/${coloreName}?page=${filterCurrentPage}`);
  axiosClient.get(`/colore/${coloreName}?page=${filterCurrentPage}`)
  .then((response)=>{
    // setSelectedColor(coloreName);
    setcoloredfilteredProucts(response.data.product.data);
    setColoreFilteredChildren(response.data.children);
    console.log('colore ',response.data.product.data);
    setFilterCurrentPage(response.data.product.current_page);
    setFilterLastPage(response.data.product.last_page);
    // console.log(response.data);
  })
  .catch((error)=>{
    console.log(error);
  })
}

const filterMarche = (marcheName, filterCurrentPage, setMarcheFilteredProducts, setMarcheFilteredChildren
  ,setFilterCurrentPage,setFilterLastPage) => {
  console.log(`/marche/${marcheName}?page=${filterCurrentPage}`);
  axiosClient.get(`/marche/${marcheName}?page=${filterCurrentPage}`)
  .then((response)=>{
    setMarcheFilteredProducts(response.data.product.data);
    console.log('marcheResponse',response)
    setMarcheFilteredChildren(response.data.children)
    setFilterCurrentPage(response.data.product.current_page);
    setFilterLastPage(response.data.product.last_page);
  })
  .catch((error)=>{
    console.log(error);
  })
}

const filterPrice = (price, filterCurrentPage, setPriceFilteredProducts, setPriceFilteredChildren,
  setFilterCurrentPage, setFilterLastPage) => {
  axiosClient.get(`/price/${price}?page=${filterCurrentPage}`)
  .then((response)=>{
    setPriceFilteredProducts(response.data.product.data);
    setPriceFilteredChildren(response.data.children);
    setFilterCurrentPage(response.data.product.current_page);
    setFilterLastPage(response.data.product.last_page);
  })
  .catch((error)=>{
    console.log(error);
  })
}  

export default {filterColore, filterMarche, filterPrice};