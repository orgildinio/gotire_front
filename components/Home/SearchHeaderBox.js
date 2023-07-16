"use client";

import AOS from "aos";
import { useState, useEffect } from "react";
import { getBanners } from "lib/banners";
import base from "lib/base";
import TireSearch from "components/Searchbox/tireSearch";
import WheelSearch from "components/Searchbox/wheelSearch";

const SearchHeaderBox = () => {
  const [banners, setBanners] = useState([]);
  const [tab, setTab] = useState("tire");

  useEffect(() => {
    const fetchBanner = async () => {
      const { banners } = await getBanners();
      setBanners(banners);
    };

    fetchBanner().catch((error) => console.log(error));

    window.onscroll = () => {
      let header = document.querySelector(".mainHeader");
      if (header) {
        let sticky = header.offsetTop;
        if (window.pageYOffset > sticky) {
          header.classList.add(`headerSticky`);
        } else {
          header.classList.remove(`headerSticky`);
        }
      }
    };
    AOS.init();
  }, []);

  return (
    <>
      <div
        className="header-search"
        style={{
          backgroundImage: `url("${base.cdnUrl}/${
            banners && banners[0] && banners[0].picture
          }")`,
        }}
      >
        <div className="container header-container">
          <div className="header-search-box">
            <div className="head-search-tabs">
              <div className={`head-tab-item ${tab == "tire" && "active"}`}>
                <div className="tab-title" onClick={() => setTab("tire")}>
                  <img src="/images/tire.png" /> ДУГУЙ ХАЙХ
                </div>
              </div>
              <div className={`head-tab-item ${tab == "wheel" && "active"}`}>
                <div className="tab-title" onClick={() => setTab("wheel")}>
                  <img src="/images/wheel.png" /> ОБУД ХАЙХ
                </div>
              </div>
            </div>
            <div className="header-search-main">
              {tab === "tire" && <TireSearch />}
              {tab === "wheel" && <WheelSearch />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchHeaderBox;
