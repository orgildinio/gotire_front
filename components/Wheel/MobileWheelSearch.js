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
import { useEffect, useState } from "react";
import { useSearchWheelContext } from "context/searchWheelContext";
import { getCategory } from "lib/categories";

const MobileWheelSearch = () => {
  const { search, createQueryString, removeQuery } = useSearchWheelContext();
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      const { categories } = await getCategory("wheel");
      setCategories(categories);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="mobile-search-box">
        <div className="container">
          <div className="mobile-search-buttons">
            <button onClick={() => setFilter(true)}>
              <FontAwesomeIcon icon={faFilter} /> Шүүлтүүр
            </button>
            <button onClick={() => setSorter(true)}>
              <FontAwesomeIcon icon={faSortAmountDown} /> Эрэмбэлэх
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
              <p> Ангилал </p>
            </div>
            <div className="search-side-body">
              <div className="search-list list-full">
                {categories &&
                  categories.map((category, index) => (
                    <button
                      onClick={() =>
                        handleMultSelect(
                          "categoryname",
                          `${category.name.toLowerCase()}`
                        )
                      }
                      className={`${
                        activeCheck(
                          "categoryname",
                          `${category.name.toLowerCase()}`
                        ) === true && "active"
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="search-side-item">
            <div className="search-side-title">
              <p> Диаметр </p>
            </div>
            <div className="search-side-body">
              <div className="search-list">
                {search &&
                  search.diameter &&
                  search.diameter.map((diameter, index) => (
                    <button
                      onClick={() =>
                        handleMultSelect("diameter", `${diameter.name}`)
                      }
                      className={`${
                        activeCheck("diameter", `${diameter.name}`) === true &&
                        "active"
                      }`}
                    >
                      {diameter.name} инч ({diameter.count})
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="search-side-item">
            <div className="search-side-title">
              <p> Өргөн </p>
            </div>
            <div className="search-side-body">
              <div className="search-list">
                {search &&
                  search.width &&
                  search.width.map((width, index) => (
                    <button
                      onClick={() => handleMultSelect("width", `${width.name}`)}
                      className={`${
                        activeCheck("width", `${width.name}`) === true &&
                        "active"
                      }`}
                    >
                      {width.name} ({width.count})
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="search-side-item">
            <div className="search-side-title">
              <p> Болтны зай </p>
            </div>
            <div className="search-side-body">
              <div className="search-list">
                {search &&
                  search.boltPattern &&
                  search.boltPattern.map((boltPattern, index) => (
                    <button
                      onClick={() =>
                        handleMultSelect("boltPattern", `${boltPattern.name}`)
                      }
                      className={`${
                        activeCheck("boltPattern", `${boltPattern.name}`) ===
                          true && "active"
                      }`}
                    >
                      {boltPattern.name} ({boltPattern.count})
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="search-side-item">
            <div className="search-side-title">
              <p> RIM </p>
            </div>
            <div className="search-side-body">
              <div className="search-list">
                {search &&
                  search.rim &&
                  search.rim.map((rim, index) => (
                    <button
                      onClick={() => handleMultSelect("rim", `${rim.name}`)}
                      className={`${
                        activeCheck("rim", `${rim.name}`) === true && "active"
                      }`}
                    >
                      {rim.name} ({rim.count})
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="search-side-item">
            <div className="search-side-title">
              <p> Болтны хэмжээ </p>
            </div>
            <div className="search-side-body">
              <div className="search-list">
                {search &&
                  search.threadSize &&
                  search.threadSize.map((threadSize, index) => (
                    <button
                      onClick={() =>
                        handleMultSelect("threadSize", `${threadSize.name}`)
                      }
                      className={`${
                        activeCheck("threadSize", `${threadSize.name}`) ===
                          true && "active"
                      }`}
                    >
                      {threadSize.name} ({threadSize.count})
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="search-side-item">
            <div className="search-side-title">
              <p> Голын диаметр </p>
            </div>
            <div className="search-side-body">
              <div className="search-list">
                {search &&
                  search.centerBore &&
                  search.centerBore.map((centerBore, index) => (
                    <button
                      onClick={() =>
                        handleMultSelect("centerBore", `${centerBore.name}`)
                      }
                      className={`${
                        activeCheck("centerBore", `${centerBore.name}`) ===
                          true && "active"
                      }`}
                    >
                      {centerBore.name} ({centerBore.count})
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
                  search.setOf.map((setOf, index) => (
                    <button
                      onClick={() => handleMultSelect("setOf", `${setOf.name}`)}
                      className={`${
                        activeCheck("setOf", `${setOf.name}`) === true &&
                        "active"
                      }`}
                    >
                      {setOf.name} ({setOf.count})
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
export default MobileWheelSearch;
