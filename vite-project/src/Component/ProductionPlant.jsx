import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import CompanyInfo from "./CompanyInfo.jsx";


const ProductionPlant = () => {
  const industries = [
    {
      id: 1,
      name: "Pharmaceutical",
      image: "/images/pharmaceutical.jpg",
    },
    {
      id: 2,
      name: "Power",
      image: "/images/power.jpg",
    },
    {
      id: 3,
      name: "Steel",
      image: "/images/steel.jpg",
    },
    {
      id: 4,
      name: "Chemical",
      image: "/images/chemical.jpg",
    },
    {
      id: 5,
      name: "Automotive",
      image: "/images/automotive.jpg",
    },
    {
      id: 6,
      name: "Food Processing",
      image: "/images/food-processing.jpg",
    },
    {
      id: 7,
      name: "Plastic",
      image: "/images/plastic.jpg",
    },
    {
      id: 8,
      name: "Textile",
      image: "/images/textile.jpg",
    },
  ];

  return (
    <>
    <section className="industries-section">

      <div className="industries-container">

        {/* Heading */}
        <div className="industries-title">
          <h2>Industries We Power</h2>
        </div>

        {/* Slider */}
        <div className="industries-slider">

          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={3}
            spaceBetween={48}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },

              576: {
                slidesPerView: 1,
                spaceBetween: 25,
              },

              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },

              992: {
                slidesPerView: 3,
                spaceBetween: 48,
              },
            }}
          >

            {industries.map((industry) => (
              <SwiperSlide key={industry.id}>

                <div className="industry-card">

                  <div className="industry-image">
                    <img
                      src={industry.image}
                      alt={industry.name}
                      loading="lazy"
                    />
                  </div>

                  <div className="industry-info">
                    <h3>{industry.name}</h3>
                  </div>

                </div>

              </SwiperSlide>
            ))}

          </Swiper>

        </div>

      </div>

    </section>
    <CompanyInfo/>
    </>
  );
};

export default ProductionPlant;