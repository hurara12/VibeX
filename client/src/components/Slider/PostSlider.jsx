import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import ImgUrl2 from "../../assets/ImageSlider/slider_2.jpg";
import ImgUrl3 from "../../assets/ImageSlider/slider_3.jpg";


const images = [
    {
      title: 'Connect With Students',
      description: 'Make New Friends',
      image_url: `${ImgUrl3}`,
    },
    {
      title: 'Make New Memories',
      description: 'Share With Mates',
      image_url: `${ImgUrl2}`,
    },
  ];
const PostSlider= () => {
  
  return (
    <div className="rounded-xl">
    {
    images?
    <Carousel >
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <div className={`h-[25vh] w-full `}>
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

export default PostSlider;
