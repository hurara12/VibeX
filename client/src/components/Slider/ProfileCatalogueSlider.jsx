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
          <div className={`flex h-[89.7vh] w-full p-0 justify-center items-center `}>
            <img src={image.image_url} alt="profile Slider" className="h-[89.7vh] w-full image object-contain rounded-lg" />
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
