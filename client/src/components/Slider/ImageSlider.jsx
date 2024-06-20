import React from 'react';
import { Carousel } from 'react-bootstrap';
import ImgUrl from "../../assets/ImageSlider/slider_1.jpg";
import ImgUrl2 from "../../assets/ImageSlider/slider_2.jpg";
import ImgUrl3 from "../../assets/ImageSlider/slider_3.jpg";

const slides = [
    {
      title: 'Connect With Students',
      description: 'Make New Friends',
      image: `${ImgUrl}`,
    },
    {
      title: 'Make New Memories',
      description: 'Share With Mates',
      image: `${ImgUrl2}`,
    },
    {
      title: 'Palestine Will Be Free',
      description: 'We Stand With Palestine',
      image: `${ImgUrl3}`,
    },
  ];

const ImageSlider = () => {
  return (
    <Carousel>
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <div className={`flex h-screen w-full justify-center items-center`}>
            <div className={` absolute top-0.6 left-0.6 transform -translate-x-0.6 -translate-y-0.6  text-white font-bold`}>
              <p className={`text-5xl shadow-2xl text-white`}>{slide.title}</p>
              <p className={`text-3xl shadow-8xl  text-center text-white`}>{slide.description}</p>
            </div>
            <img src={slide.image} alt="Slider" className="h-screen w-full image object-cover" />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
