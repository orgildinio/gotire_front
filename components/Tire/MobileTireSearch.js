"use client";
import {
  faClose,
  faFilter,
  faSortAmountDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchContext } from "context/searchContext";

import { Slider } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const MobileTireSearch = () => {
  const { search, createQueryString, removeQuery, car } = useSearchContext();
  const [filter, setFilter] = useState(false);
  const [sorter, setSorter] = useState(false);
  const formatter = (value) => `${new Intl.NumberFormat().format(value)}₮`;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = [
    {
      value: "new",
      label: "Шинэ нь эхэндээ",
    },
    {
      value: "old",
      label: "Хуучин нь эхэндээ",
    },
    {
      value: "cheap",
      label: "Үнэ өсөхөөр",
    },
    {
      value: "expensive",
      label: "Үнэ буурахаар",
    },
  ];

  const queryBuild = (name, value, isSame = false) => {
    let query = "?";
    let params = "";
    if (isSame === false) {
      params = createQueryString(name, value);
    } else {
      params = removeQuery(name, value);
    }
    router.push(pathname + query + params);
  };

  const handleSort = (name, value) => {
    queryBuild(name, value);
  };

  const handleMultSelect = (name, value) => {
    let isSame = false;
    let params = searchParams.get(name);
    let setParams = [];

    if (params) {
      setParams = params.split(",");
    }

    if (setParams.length > 0) {
      const filter = setParams.filter((el) => el == value);
      if (filter.length > 0) {
        filter.map((same) =>
          setParams.splice(
            setParams.findIndex((e) => e === same),
            1
          )
        );
      } else {
        setParams.push(value);
      }
    } else {
      setParams.push(value);
    }

    queryBuild(name, setParams, isSame);
  };

  const handlePrice = (checked) => {
    if (checked) {
      const min = searchParams.get("minprice");

      if (parseInt(min) === checked[0]) {
        queryBuild("maxprice", checked[1]);
      } else {
        queryBuild("minprice", checked[0]);
      }
    }
  };

  const activeCheck = (name, value) => {
    let params = searchParams.get(name);
    let setParams = [];

    if (params) {
      setParams = params.split(",");
    }

    const filter = setParams.filter((el) => el == value);
    if (filter.length > 0) return true;
    else return false;
  };

  return (
    <>
      <div className="mobile-search-box">
        <div className="container">
          <div className="mobile-search-buttons">
            <button onClick={() => setFilter(true)}>
              Шүүлт <FontAwesomeIcon icon={faFilter} />
            </button>
            <button onClick={() => setSorter(true)}>
              Эрэмбэлэх <FontAwesomeIcon icon={faSortAmountDown} />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`mobile-search-black ${filter === false && "displayNone"}`}
        onClick={() => setFilter(false)}
      ></div>
      <div
        className={`mobile-search-main ${filter === false && "displayNone"}`}
      >
        <div className="container">
          <div className="mobile-search-close" onClick={() => setFilter(false)}>
            <FontAwesomeIcon icon={faClose} />
          </div>
          <div className="search-side-item">
            <div className="search-side-title">
              <p> Хэмжээ </p>
            </div>
            <div className="search-side-body">
              <div className="search-list">
                {search &&
                  search.tiresize &&
                  search.tiresize.map((size, index) => (
                    <button
                      onClick={() =>
                        handleMultSelect(
                          "tiresize",
                          `${size.width}/${size.height}R${size.diameter}`
                        )
                      }
                      className={`${
                        activeCheck(
                          "tiresize",
                          `${size.width}/${size.height}R${size.diameter}`
                        ) === true && "active"
                      }`}
                    >
                      {size.width}/{size.height}R{size.diameter}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="search-side-item">
            <div className="search-side-title">
              <p> Хувь </p>
            </div>
            <div className="search-side-body">
              <div className="search-list">
                {search &&
                  search.use &&
                  search.use.map((use) => (
                    <button
                      onClick={() => handleMultSelect("use", use.name)}
                      className={`${
                        activeCheck("use", use.name) === true && "active"
                      }`}
                    >
                      {parseInt(use.name) === 100 ? "Шинэ" : use.name + "%"}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="search-side-item">
            <div className="search-side-title">
              <p> Улирал </p>
            </div>
            <div className="search-side-body">
              <div className="search-list">
                {search &&
                  search.season &&
                  search.season.map((season) => (
                    <button
                      onClick={() => handleMultSelect("season", season.name)}
                      className={`${
                        activeCheck("season", season.name) === true && "active"
                      }`}
                    >
                      {(season.name === "winter" && "Өвлийн") ||
                        (season.name === "summer" && "Зуны") ||
                        (season.name === "allin" && "Дөрвөн улиралын")}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="search-side-item">
            <div className="search-side-title">
              <p> Багц </p>
            </div>
            <div className="search-side-body">
              <div className="search-list">
                {search &&
                  search.setOf &&
                  search.setOf.map((set) => (
                    <button
                      onClick={() => handleMultSelect("setof", set.name)}
                      className={`${
                        activeCheck("setof", set.name) === true && "active"
                      }`}
                    >
                      {set.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="search-side-item">
            <div className="search-side-title">
              <p> Үнэ </p>
            </div>
            <div className="search-side-body">
              {search && search.price && (
                <Slider
                  range
                  tooltip={{
                    formatter,
                  }}
                  onChange={(checked) => handlePrice(checked)}
                  min={search.price[0].min}
                  max={search.price[0].max}
                  defaultValue={[search.price[0].min, search.price[0].max]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`mobile-search-black ${sorter === false && "displayNone"}`}
        onClick={() => setSorter(false)}
      ></div>
      <div
        className={`mobile-search-main ${sorter === false && "displayNone"}`}
        style={{ height: "50%" }}
      >
        <div className="container">
          <div className="mobile-search-close" onClick={() => setSorter(false)}>
            <FontAwesomeIcon icon={faClose} />
          </div>
          <h6> Эрэмбэлэх </h6>
          <div className="mobile-sort-list">
            {sort.map((el) => (
              <button
                onClick={() => handleSort("sort", el.value)}
                className={`${
                  activeCheck("sort", el.value) === true && "active"
                }`}
              >
                {" "}
                {el.label}{" "}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default MobileTireSearch;
