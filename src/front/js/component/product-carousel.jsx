import React from "react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselControl,
} from "reactstrap";
// import "../../styles/carousel-products.css";

export const ProductCarousel = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === store.product.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? store.product.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = store.product.map((item) => {
    return (
      <CarouselItem
        className="custom-tag bg-dark"
        tag="div"
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <Link
          style={{ textDecoration: "none" }}
          to={"/product-detail/" + item.id}
        >
          <div className="card bg-dark">
            <img
              src={item.url}
              className="img-fluid rounded-start w-100"
              alt={item.altText}
            />

            {/* <p className="card-title text-center">{item.name}</p> */}
          </div>
        </Link>
      </CarouselItem>
    );
  });

  return (
    <div
      className="container bg-dark text-light my-3"
      style={{ width: "65%", margin: "auto", marginTop: "30%" }}
    >
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        style={{ width: "70%", margin: "auto" }}
      >
        <CarouselIndicators
          items={store.product}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
          style={{ width: "40%", margin: "auto" }}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
          style={{ padding: "-50px" }}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
};
