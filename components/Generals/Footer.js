"use client";

import { useWebInfoContext } from "context/webinfoContext";
import base from "lib/base";
import { getSocials } from "lib/socialLinks";
import Link from "next/link";
import { useEffect, useState } from "react";

export default () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const { info } = useWebInfoContext();

  useEffect(() => {
    if (info.phone) {
      const phones = info.phone.split(",");
      setPhoneNumber(phones);
    }
  }, [info]);

  useEffect(() => {
    const fetchDatas = async () => {
      const { socialLinks } = await getSocials();
      setSocialLinks(socialLinks);
    };

    fetchDatas().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="topBtn" onClick={() => window.scrollTo(0, 0)}>
        Дээш очих
      </div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="footer-info">
                {info.logo && (
                  <a href="/">
                    <img
                      src={`${base.cdnUrl}/${info.whiteLogo}`}
                      className="whiteLogo"
                    />
                  </a>
                )}
                <p>{info.siteInfo}</p>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="footer-menu">Цэс</div>
              <ul className="footer-links">
                <li>
                  <Link href="/services"> Үйлчилгээ </Link>
                </li>
                <li>
                  <Link href="/tires"> Дугуй </Link>
                </li>
                <li>
                  <Link href="/wheels"> Обуд </Link>
                </li>
                <li>
                  <Link href="/news"> Зөвлөгөө </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2">
              <div className="footer-menu">Туслах цэс</div>
              <ul className="footer-links">
                <li>
                  <Link href="/faqs"> Түгээмэл асуулт </Link>
                </li>
                <li>
                  <Link href="/terms"> Үйлчилгээний нөхцөл </Link>
                </li>
                <li>
                  <Link href="/contact"> Холбоо барих </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-4">
              <div className="footer-menu">Холбоо барих</div>
              <ul className="footer-links">
                {" "}
                <li>
                  <a href={`tel:${phoneNumber && phoneNumber[0]}`}>
                    Утас: {info.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${info.email}`}> Имэйл: {info.email} </a>
                </li>
                <li>Хаяг: {info.address}</li>
              </ul>
              <div className="footer-social-links">
                {socialLinks &&
                  socialLinks.map((el) => (
                    <a href={el.link} target="_blank" key={`${el._id}-social`}>
                      {el.name.toLowerCase()}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
