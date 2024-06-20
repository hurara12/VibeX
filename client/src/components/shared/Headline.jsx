import React from 'react';
import { Carousel } from 'react-bootstrap';
import { FaRegHandshake } from "react-icons/fa";


const slides = [
    {
      title: 'Connect With Students',
      description: 'Make New Friends',
    },
    {
      title: 'Make New Memories',
      description: 'Share With Mates',
    },
    {
      title: 'Palestine Will Be Free',
      description: 'We Stand With Palestine',
    },
  ];

const Headline = () => {
  return (
    <Carousel>
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <div className={`flex h-15 z-20 w-full justify-center bg-black text-white py-1 items-center`}>{slide.title}</div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Headline;
