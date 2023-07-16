"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "styles/banner.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { Navigation } from "swiper";
import base from "lib/base";

import { Suspense, useEffect, useState } from "react";
import { useBookingContext } from "context/bookingContext";
import { usePathname, useRouter } from "next/navigation";
import Share from "components/Generals/Share";
import Loading from "app/loading";
import {
  faArrowLeft,
  faEnvelope,
  faEye,
  faMapMarked,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { getServices } from "lib/services";
import { useWebInfoContext } from "context/webinfoContext";
import { getSocials } from "lib/socialLinks";

const ServiceDetails = ({ page }) => {
  const router = useRouter();
  const [more, setMore] = useState(false);
  const [topServices, setTopServices] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const { info } = useWebInfoContext();
  const pathname = usePathname();
  useEffect(() => {
    if (info.phone) {
      const phones = info.phone.split(",");
      setPhoneNumber(phones);
    }
  }, [info]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDatas = async () => {
      const { services: reachService } = await getServices(
        `status=true&sort=views:descend&limit=6`
      );
      const { socialLinks } = await getSocials();

      setSocialLinks(socialLinks);
      setTopServices(reachService);
    };

    fetchDatas().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div
        className="pageDetailsHeader"
        style={{
          background: `url(/images/header.jpg)`,
          backgroundSize: "cover",
        }}
      >
        {" "}
        <div className="container">
          <h2> {page && page.name} </h2>
          <div className="bread">
            <li>
              <Link href="/"> Нүүр </Link>
            </li>
            <span> /</span>
            <li>
              <Link href="/services"> Үйлчилгээнүүд </Link>{" "}
            </li>
            <span> /</span>
            <li>{page && page.name}</li>
          </div>
        </div>
      </div>
      <section className="pageDetails">
        <div className="container">
          {page && (
            <div className="row">
              <div className="col-lg-8">
                <div className="page_detials">
                  <div className="page_detials_header">
                    <div className="page_header_left">
                      <button
                        className="page-back"
                        onClick={() => router.back()}
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </button>
                      <h2>{page.name}</h2>
                    </div>
                  </div>
                  <div className="page_images" style={{ width: "100%" }}>
                    {page.pictures && page.pictures.length === 1 && (
                      <img src={`${base.cdnUrl}/${page.pictures[0]}`} />
                    )}
                    {page.pictures && page.pictures.length > 1 && (
                      <Swiper
                        modules={[Navigation]}
                        autoHeight={true}
                        navigation={{
                          prevEl: ".newsViewSlider__prev",
                          nextEl: ".newsViewSlider__next",
                        }}
                        className="newsViewSlider"
                      >
                        {page.pictures.map((pic, index) => (
                          <SwiperSlide
                            className="newsViewSlide"
                            key={index + "nview"}
                          >
                            <img src={`${base.cdnUrl}/${pic}`} />
                          </SwiperSlide>
                        ))}
                        <div className="newsViewSlide__nav">
                          <div className="newsViewSlider__prev swiper-button-prev"></div>
                          <div className="newsViewSlider__next swiper-button-next"></div>
                        </div>
                      </Swiper>
                    )}
                  </div>
                  <Share shareUrl={base.baseUrl + pathname} />

                  <div className="page_details">
                    <div
                      className={`description ${more === true && "more"}`}
                      dangerouslySetInnerHTML={{
                        __html: page.details,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="page_sides sticky-top">
                  <div className="page-side">
                    <ul className="side-menus">
                      {topServices &&
                        topServices.map((service) => (
                          <li>
                            <Link href={`/services/${service.slug}`}>
                              {service.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="page-side ">
                    <div className="side-contacts">
                      <span> Gotire.mn </span>
                      <h5>Бидэнтэй холбогдох </h5>
                      <ul className="side-social-links">
                        {phoneNumber &&
                          phoneNumber.map((phone) => (
                            <li>
                              <a href={`tel:${phone && phone}`}>
                                <FontAwesomeIcon icon={faPhone} />
                                {"Утас: (+976) " +
                                  phone.substring(0, 4).toString() +
                                  "-" +
                                  phone.substring(4)}
                              </a>
                            </li>
                          ))}
                        <li>
                          <a href={`mailto:${info.email}`}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            Имэйл:
                            {info.email}
                          </a>
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faMapMarked} />
                          Хаяг: {info.address}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default ServiceDetails;
