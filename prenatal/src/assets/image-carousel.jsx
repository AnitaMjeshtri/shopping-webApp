/* eslint-disable react/prop-types */
// import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ImageCarousel({ products, card}) {
  return (
    <Carousel showThumbs={false}>
      {products.length > 0 ? products.map((product) => (
        <div key={card.id} className='image-carousel'>
          <img src={product.image_link} className='carousel-image' alt={`Image ${product.id}`} />
        </div>
      )) : <img src={card.image_link}/>}
    </Carousel>
  );
}
