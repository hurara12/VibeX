import React from 'react';
import { Carousel } from 'react-bootstrap';
import ImgUrl from "../../assets/ImageSlider/advert_1.jpg";
import ImgUrl2 from "../../assets/ImageSlider/advert_2.jpg";
import ImgUrl3 from "../../assets/ImageSlider/advert_3.jpg";
import ImgUrl4 from "../../assets/ImageSlider/advert_4.jpg";
import ImgUrl5 from "../../assets/ImageSlider/advert_5.jpg";
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
    {
        title: 'Palestine Will Be Free',
        description: 'We Stand With Palestine',
        image: `${ImgUrl4}`,
      },
      {
        title: 'Palestine Will Be Free',
        description: 'We Stand With Palestine',
        image: `${ImgUrl5}`,
      },
  ];

const RightAdvertSlider = () => {
  return (
    <div className="rounded-xl">
    <Carousel >
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <div className={`flex h-[100vh] p-2 w-full justify-center items-center `}>
            <img src={slide.image} alt="Slider" className="h-full w-full image object-cover" />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
  );
};

export default RightAdvertSlider;
