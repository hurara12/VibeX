import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const ProfileCatalogueSlider = ({images}) => {
  
  return (
    <div className="rounded-xl">
    {
    images?
    <Carousel >
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <div className={`w-full h-[50vh] lg:h-[80vh] flex justify-center`}>
            <img src={image.image_url} alt="profile Slider" className="object-contain " />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
    :
    <h1>waiting..</h1>
    }
    </div>
  );
};

export default ProfileCatalogueSlider;
