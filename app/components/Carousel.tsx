// components/Carousel.tsx
import Image from 'next/image';
import React, { useContext } from 'react';
import Slider from "react-slick";
import { CarouselContext } from '../context/carouselContext';
import tumbnail from '../../public/assets/tumbnail.png';


const Carousel: React.FC = () => {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error('Carousel must be used within a CarouselProvider');
  }

  const { activeSlide, setActiveSlide } = context;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,  // Enable center mode
  //centerPadding: '100px',  // Add padding either side of the center slide
  rtl:true,
    afterChange: (current: number) => setActiveSlide(current)
  };

  return (
    <div className="carousel-container" >
    <Slider {...settings}>
      {/* Add your slide content here */}
      <div className='slide-container '>
        <div className='slide-context ' dir='rtl'>
        <Image src={tumbnail} alt="Experteam AI logo" className='m-auto w-[100%]'/>
<div>
       <h3>1 הידעת?</h3>
<p>
כלי לעיבוד שפה טבעית המונע על ידי טכנולוגיית AI המאפשרת לך לנהל שיחות כמו אנושיות ועוד הרבה יותר עם הצ'אטבוט
</p></div>
        </div>
        </div>
      <div className='slide-container '>       
       <div className='slide-context ' dir='rtl'>
       <Image src={tumbnail} alt="Experteam AI logo" className='m-auto w-[100%]'/>
       <div>
       <h3>2 הידעת?</h3>
<p>
כלי לעיבוד שפה טבעית המונע על ידי טכנולוגיית AI המאפשרת לך לנהל שיחות כמו אנושיות ועוד הרבה יותר עם הצ'אטבוט
</p></div>
        </div>
        </div>
      <div className='slide-container '>    
      <div className='slide-context ' dir='rtl'>
      <Image src={tumbnail} alt="Experteam AI logo" className='m-auto w-[100%]'/>
      <div>
       <h3>3 הידעת?</h3>
<p>
כלי לעיבוד שפה טבעית המונע על ידי טכנולוגיית AI המאפשרת לך לנהל שיחות כמו אנושיות ועוד הרבה יותר עם הצ'אטבוט
</p></div>
      </div>
       </div>
      <div className='slide-container '>
      <div className='slide-context ' dir='rtl'>
      <Image src={tumbnail} alt="Experteam AI logo" className='m-auto w-[100%]'/>
      <div>
       <h3>4 הידעת?</h3>
<p>
כלי לעיבוד שפה טבעית המונע על ידי טכנולוגיית AI המאפשרת לך לנהל שיחות כמו אנושיות ועוד הרבה יותר עם הצ'אטבוט
</p></div>
        </div>
      </div>
      <div className='slide-container '>
      <div className='slide-context ' dir='rtl'>
      <Image src={tumbnail} alt="Experteam AI logo" className='m-auto w-[100%]'/>
      <div>
       <h3>5 הידעת?</h3>
<p>
כלי לעיבוד שפה טבעית המונע על ידי טכנולוגיית AI המאפשרת לך לנהל שיחות כמו אנושיות ועוד הרבה יותר עם הצ'אטבוט
</p></div>
        </div>
      </div>
      <div className='slide-container'>
      <div className='slide-context ' dir='rtl'>
      <Image src={tumbnail} alt="Experteam AI logo" className='m-auto w-[100%]'/>
      <div>
       <h3>6 הידעת?</h3>
<p>
כלי לעיבוד שפה טבעית המונע על ידי טכנולוגיית AI המאפשרת לך לנהל שיחות כמו אנושיות ועוד הרבה יותר עם הצ'אטבוט
</p></div>
        </div>
      </div>
    </Slider>
    </div>
  );
};

export default Carousel;
