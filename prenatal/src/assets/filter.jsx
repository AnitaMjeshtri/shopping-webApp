/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Filter({selectedColor, selectedMarche, selectedPrice, setSelectedColor, setSelectedMarche,
  setSelectedPrice, cards, setFilterCurrentPage,setFilterLastPage }){

  const [showSelectVisible, setShowSelectVisible] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSelectVisible_marche, setSelectVisible_marche] = useState(false);
  const [showPrezo, setShowPrezo] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);


  const settingColor = (colorName) => {
    setSelectedColor(colorName);
    resetFiltersPage();
  }

  const resetFiltersPage = () => {
    setFilterCurrentPage(1);
    setFilterLastPage(1206);
  }

  const resetFilters = () => {
    setFilterCurrentPage(1);
    setFilterLastPage(2605);
    setSelectedColor("");
    setSelectedMarche("");
    setSelectedPrice("");
  };


  const show = () => {
    setShowSelectVisible(!showSelectVisible)
    if(showSelectVisible_marche){
      setSelectVisible_marche(false);
    }
    if(showPrezo){
      setShowPrezo(false);
    }
  }
  const showMarche1 = () => {
    setSelectVisible_marche(!showSelectVisible_marche);
    if(showSelectVisible){
      setShowSelectVisible(false);
    }
    if(showPrezo){
      setShowPrezo(false);
    }
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  }

  const togglePriceFilter = () => {
    setShowPrezo(!showPrezo);
    if(showSelectVisible_marche){
      setSelectVisible_marche(false);
    }
    if(showSelectVisible){
      setShowSelectVisible(false);
    }
  }

  const showSelect = () => {
    let previousColor = [];
    
      return (
      <div className={`custom-select ${showSelectVisible ? "open" : ""}`}>
      <div className=" absolute filtered">
      <div
      onClick={()=>setShowSelectVisible(!showSelectVisible)} className="selected-color flex justify-center align-items-center"
      id="mySelect">
      {selectedColor ? <h2 className="text-pink-600 font-2xl font-bold p-4">{selectedColor}</h2>
      :  <h2 className="text-pink-600 font-2xl font-bold p-4">FiltraPerColore</h2>}
      </div>
      <div className="options">
      {/* <option value="" disabled>Please select a color</option> */} 
        {cards.map((card) => {
          if (!previousColor.includes(card.colore)) {
            previousColor[previousColor.length] = card.colore;
            return (
              <div key={card.id} className={`color-option cursor-pointer ${
                    card.colore === selectedColor ? "selected" : ""
                  }`} onClick={() => settingColor(card.colore)}>
              {card.colore}
              </div>
            );
          }
        })}
      </div>
      </div>
      </div>
    );
  };

  const settingMarche = (marcheName) => {
    setSelectedMarche(marcheName);
    resetFiltersPage();
  }
    
  const showMarche = () => {
    let previousMarche = [];

    return (
      <div className={`custom-select ${showSelectVisible_marche ? "open" : ""}`}>
        <div className="absolute filtered">
      <div
      onClick={()=>setSelectVisible_marche(!showSelectVisible_marche)} className="selected-color flex justify-center align-items-center"
      id="mySelect">
      {selectedMarche ? <h2 className="text-pink-600 font-2xl font-bold p-4">{selectedMarche}</h2>
      :  <h2 className="text-pink-600 font-2xl font-bold p-4">FiltraPerMarche</h2>}
      </div>
      <div className="options">
      {/* <option value="" disabled>Please select a color</option> */}
        {cards.map((card) => {
          if (!previousMarche.includes(card.marche)) {
            previousMarche[previousMarche.length] = card.marche;
            return (
              <div key={card.id} className={`color-option cursor-pointer ${
                    card.marche === selectedMarche ? "selected" : ""
                  }`} onClick={() => settingMarche(card.marche)}>
              {card.marche}
              </div>
            );
          }
        })}
      </div>
      </div>
      </div>
    )
  }

  return (
    <div className='filter-div flex justify-left align-items-center'>
    <button className="remove-filter flex" onClick={resetFilters}><img className="max-w-6 max-h-6 mr-3 text-pink-600" src="/images/filter.png" />FILTRI</button>
    <button className="filter hidden flex justify-center align-items-center" onClick={toggleFilter} ><img className="max-w-6 max-h-6 mr-3" src="/images/filter.png" />FILTRI</button>
    <div className={`filter-options flex ${isFilterOpen ? 'open' : ''}`}>
        <button onClick={show} id="colore" className="f-button border-1 px-3 m-3 hover:bg-gray-400 hover:text-white rounded-xl text-sm border-gray-500 flex align-items-center">Colore&nbsp;&nbsp;<i className="fa-solid fa-chevron-down"></i></button>
      <div className="custom-select">
        {showSelectVisible && showSelect()}
      </div>
      <button onClick={showMarche1} id="marche" className="f-button border-1 py-2 px-3 m-3 hover:bg-gray-400 hover:text-white rounded-xl text-sm border-gray-500 flex align-items-center">Marche&nbsp;&nbsp;<i className="fa-solid fa-chevron-down"></i></button>
      <div className="custom-select">
        {showSelectVisible_marche && showMarche()}
      </div>
      
      <button onClick={togglePriceFilter} className="f-button border-1 py-2 px-3 m-3 hover:bg-gray-400 hover:text-white rounded-xl text-sm border-gray-500 flex align-items-center">Prezzo&nbsp;&nbsp;<i className="fa-solid fa-chevron-down"></i></button>
      <div className="custom-select flex justify-center align-items-center">
      {showPrezo && (
      <div className="absolute filtered f-prezzo">
        <div className="flex flex-col justify-center align-items-center px-16 py-3">
          <label htmlFor="customRange1" className="form-label m-1">Prezzo: ${selectedPrice}</label>
            <input type="range" className="form-range mt-3" id="customRange1"
            min="0" max="1000" value={maxPrice}
            onChange={(e)=>{
            const newPrice = parseFloat(e.target.value);
            setMaxPrice(newPrice);
            setSelectedPrice(newPrice);
            resetFiltersPage();
            }
            }></input>
        </div>
      </div>
      )}
    
      </div>
      <div className="flex justify-center">
        <button className="remove-filter-phone-size hidden p-2 mt-3 rounded-lg border-solid border-gray-400 text-pink-600 border-1 hover:bg-blue-500 hover:text-white text-center text-sm" onClick={resetFilters}>RIMUVIERE IL FILTRO</button>
      </div>
    </div>
  </div>
  )
}