import React from 'react';
import { Zoom } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css'

const images = [
  '/assets/images/avatar1.jpg',
];

export const Slideshow = () => {
    return (
      <div className="slide-container">
        <Zoom scale={0.4}>
          {
            images.map((each, index) => <img key={index} style={{width: "100%"}} src={each} />)
          }
        </Zoom>
      </div>
    )
}