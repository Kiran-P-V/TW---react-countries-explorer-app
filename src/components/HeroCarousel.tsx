import { useState } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import Globe from "../assets/globe.jpg";
import WorldMapWhite from "../assets/worldmapwhite.jpg";

const slides = [
  { image: WorldMapWhite },
  { image: WorldMapWhite },
  { image: WorldMapWhite },
];

function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <Row className="g-3 mb-4">
      <Col lg={4} className="order-1 order-lg-2">
        <div className="border bg-white shadow-sm p-2 h-100">
          <img
            src={Globe}
            alt="World map"
            className="w-100 h-100 object-fit-cover"
            loading="lazy"
          />
        </div>
      </Col>
      <Col lg={8} className="order-2 order-lg-1">
        <div className="border bg-white shadow-sm p-2 position-relative">
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            interval={4000}
            variant="dark"
            indicators={false}
            controls={false}
          >
            {slides.map((slide, idx) => (
              <Carousel.Item key={idx}>
                <div className="ratio ratio-16x9">
                  <img
                    src={slide.image}
                    alt={`World map slide ${idx + 1}`}
                    className="w-100 h-100 object-fit-cover"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Custom Controls */}
          <div
            className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex align-items-center gap-3 bg-white px-3 py-1 rounded-pill shadow-sm bg-opacity-75"
            style={{ zIndex: 10 }}
          >
            <button
              className="btn btn-sm btn-link text-dark p-0 text-decoration-none d-flex align-items-center"
              onClick={handlePrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </button>

            <div className="d-flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`border-0 rounded-circle transition-all ${
                    index === idx ? "bg-dark" : "bg-secondary bg-opacity-25"
                  }`}
                  style={{
                    width: index === idx ? "10px" : "8px",
                    height: index === idx ? "10px" : "8px",
                    padding: 0,
                    transition: "all 0.2s ease",
                  }}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              className="btn btn-sm btn-link text-dark p-0 text-decoration-none d-flex align-items-center"
              onClick={handleNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default HeroCarousel;
