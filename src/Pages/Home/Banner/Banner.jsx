import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerimg1 from '../../../assets/banner/banner1.png';
import bannerimg2 from '../../../assets/banner/banner2.png';
import bannerimg3 from '../../../assets/banner/banner3.png';

const Banner = () => {
    return (
       <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
        <div>
            <img src={bannerimg1} alt="" />
            <p></p>
        </div>
        <div>
            <img src={bannerimg2} alt="" />
            <p></p>
        </div>
        <div>
            <img src={bannerimg3} alt="" />
            <p></p>
        </div>
       </Carousel>
    );
};

export default Banner;