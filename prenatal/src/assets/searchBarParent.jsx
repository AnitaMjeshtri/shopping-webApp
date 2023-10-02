import { useState } from "react";
import SearchPage from './searchBar';
import axiosClient from "../axios-client";
function ParentComponent(){
  const [searchResult, setSearchResult] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');

  const performSearch = () => {
    console.log('perform search at parent called');
    axiosClient.get(`/products?query=${searchQuery}`)
      .then((response) => {
        console.log('url', `/products?query=${searchQuery}`)
        const searchResult = response.data.cards.data; // Assign search results to state
        console.log('searchResult',searchResult);
        setSearchResult(searchResult); // Update the state
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    //render searchPage and pass setSearchResult as a prop
    <div>
    <SearchPage
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSearchResult={setSearchResult}
        performSearch={performSearch}
      />

      {searchQuery && searchResult.map((card) => (
        <div key={card.id} className="recommended-card-body flex-col bg-white lg:w-1/4 md:w-1/3 sm:w-1/2">
          <div className="image-div border-3 border-solid">
            <img src={card.image_link} alt="image" />
          </div>
          <div className="flex-col p-3">
            <h2 className="text-pink-600 font-bold">{card.price}</h2>
            <h2>{card.title}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ParentComponent;