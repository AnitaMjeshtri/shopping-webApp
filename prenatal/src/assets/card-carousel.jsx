/* eslint-disable react/prop-types */
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-bootstrap'; 

const CardCarousel = ({ cards }) => {
  return (
    <Carousel style={{ maxWidth: 'auto',
    margin: '0 auto',
    height: 'auto'}}>
      {cards.map((item) => (
        <Carousel.Item key={item.id} className="carousel-div">
          <div className="flex flex-row"> {/* Use a wrapping div for the row */}
            <img
              className="carousel-image h-100"
              style={{ maxWidth: '250px', maxHeight: '300px'}} // This class ensures the image takes up the full width of the Carousel
              src={item.image_link}
              alt={item.title}
            />
            <Carousel.Caption className="flex flex-col flex-grow relative justify-center">
              <h2 className="text-center font-bold text-pink-600">{item.price}</h2>
              <h2 className="font-bold text-black">{item.title}</h2>
            </Carousel.Caption>
          </div>
          <div className="card-content">
            <p className="p-3">{item.description}</p>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CardCarousel;