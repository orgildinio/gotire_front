"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import base from "lib/base";
import Link from "next/link";
import { getMakes } from "lib/tire";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSearchContext } from "context/searchContext";

const HeaderTireBrands = () => {
  const { createQueryString } = useSearchContext();
  const [makes, setMakes] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const { makes } = await getMakes(`limit=1000`);
      setMakes(makes);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="head-brands">
        <Swiper
          autoHeight={true}
          simulateTouch="false"
          slidesPerView={10.5}
          spaceBetween={20}
          className="brand-slider"
          breakpoints={{
            1399: {
              slidesPerView: 10.5,
            },
            1200: {
              slidesPerView: 7.5,
            },

            992: {
              slidesPerView: 6.5,
            },

            768: {
              slidesPerView: 5.5,
            },

            600: {
              slidesPerView: 3.5,
            },

            575: {
              slidesPerView: 3.5,
            },

            400: {
              slidesPerView: 2.5,
            },

            300: {
              slidesPerView: 2.4,
            },

            230: {
              slidesPerView: 1.4,
              spaceBetween: 10,
            },

            100: {
              slidesPerView: 1.3,
            },
          }}
        >
          {makes &&
            makes.map((make, index) => (
              <SwiperSlide className="brand-slider-item" key={index + "brand"}>
                <div
                  className="tire-brand tire-small-brand"
                  onClick={() =>
                    router.push(
                      pathname +
                        "?" +
                        createQueryString("make", make.name.toLowerCase())
                    )
                  }
                >
                  {make.logo ? (
                    <img src={`${base.cdnUrl}/450/${make.logo}`} />
                  ) : (
                    <img src={`/images/no-brand.png`} />
                  )}
                  <div className="tire-count"> {make.tireCount} </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default HeaderTireBrands;
