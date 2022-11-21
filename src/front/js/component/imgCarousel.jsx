import React, { useState } from "react";
import { Carousel, CarouselItem, CarouselIndicators } from "reactstrap";

import "../../styles/imgCarousel.css";

const items = [
  {
    src: "https://res.cloudinary.com/dgqyqqtk4/image/upload/v1668795950/proyecto-final/slide_img_2_dt7jgc.png",
    // altText: "Slide 1",
    // caption: "Slide 1",
    key: 1,
  },
  {
    src: "https://res.cloudinary.com/dgqyqqtk4/image/upload/v1668796489/proyecto-final/slide_img_3_aew03x.png",
    // altText: "Slide 2",
    // caption: "Slide 2",
    key: 2,
  },
  {
    src: "https://res.cloudinary.com/dgqyqqtk4/image/upload/v1668797422/proyecto-final/slide_img_4_xjx1kb.png",
    // altText: "Slide 3",
    // caption: "Slide 3",
    key: 3,
  },
];

export const ImgCarousel = (args) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        {/* <CarouselCaption captionText={null} captionHeader={null} /> */}
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
      className="bg-dark"
      style={{ margin: "auto", maxWidth: "100%" }}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      {/* <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      /> */}
    </Carousel>
  );
};
