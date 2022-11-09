import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

const items = [
  {
    src: "https://res.cloudinary.com/dgqyqqtk4/image/upload/v1667834167/proyecto-final/4_m9v4mu.png",
    // altText: "Slide 1",
    // caption: "Slide 1",
    key: 1,
  },
  {
    src: "https://res.cloudinary.com/dgqyqqtk4/image/upload/v1667834246/proyecto-final/7_dlkw8y.png",
    // altText: "Slide 2",
    // caption: "Slide 2",
    key: 2,
  },
  {
    src: "https://res.cloudinary.com/dgqyqqtk4/image/upload/v1667834289/proyecto-final/5_leovz9.png",
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
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};
