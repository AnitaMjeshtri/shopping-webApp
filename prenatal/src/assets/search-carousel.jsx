/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axiosClient from '../axios-client';
import addToCart from './AddToCard';

export default function CarouselAlice() { 


    const [cards, setCards] = useState([]);
    const [childrens, setChildrens] = useState([]);

  const responsive = {
    0: { items: 1},
    560: { items: 2 },
    800: {items: 3},
    1024: { items: 4 },
};

    useEffect(()=>{
      axiosClient.get('/searchCarousel')
      .then((response)=>{
        setCards(response.data.cards)
        console.log(response)
        setChildrens(response.data.childrens)
      })
      .catch((error)=>{
        console.log(error);
      })
    },[])

    const getChildrenPrice = (product_id) => {

      let childrenPrices = {};
      for(const child of childrens){
        if(child.parent_id === product_id){
          childrenPrices[product_id] = {
            price: child.price,
            vip_price: child.vip_price
          }
        }
        
      }
      
      return childrenPrices;
    }

    
  const getChild = (card) => {
    for(const child of childrens){
      if(child.parent_id === card.product_id){
        return child;
      }
    }
    return null;
  }

    return (
    <AliceCarousel
    mouseTracking
    responsive={responsive}
    controlsStrategy="alternate"
    stagePadding={{ paddingLeft: 100, paddingRight: 100 }}
    >
    {cards.map((card)=>(
      <div key={card.id} className="recommended-card-body-searched mx-4 border-1 hover:border-pink-600 bg-white flex flex-wrap justify-center align-items-center">
          <div className="image-div w-40 mt-3 border-3 border-solid">
            <img src={card.image_link} alt="image" />
          </div>
          <div className="flex-col p-3">
            <div className='h-24'>
                <div className="flex justify-center align-items-center">
                  <h2 className="font-thin">{card.marche}</h2>
                </div>
                <h2 className="mb-4">{card.title}</h2>
            </div>

            <div className='h-22'>
                <h2 className="text-black font-bold mb-2"><i className="fa-solid fa-euro-sign"></i>{card.price ? card.price : getChildrenPrice(card.product_id)[card.product_id].price}</h2>
                <div className="flex">
                  <p className='font-bold text-pink-600 text-sm mr-2'>&nbsp;VIP Club</p>
                  <h2 className="text-pink-600 font-bold"><i className="fa-solid fa-euro-sign"></i>{getChildrenPrice(card.product_id)[card.product_id] ? getChildrenPrice(card.product_id)[card.product_id].vip_price : <></>}</h2>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="flex">
                  <button onClick={() => {card.price ? addToCart(card) : (getChild(card) ? addToCart(getChild(card)) : '') }} className={`addToCart bg-pink-100 hover:bg-pink-300 rounded-xl px-2 py-2 mt-2 ${  card.stock || (getChild(card) && getChild(card).stock) > 0 ? '' : 'disable'}`}><img src='/public/images/shopping-icon.png'/></button>
                </div>
              </div>
            </div>
        </div>
    ))}
    </AliceCarousel>
    )
}

