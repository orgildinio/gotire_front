"use client";
import {
  faClose,
  faFilter,
  faSortAmountDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getCategory } from "lib/categories";
import { Slider } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchProductContext } from "context/searchProductContext";

const MobileProductSearch = () => {
  const { search, createQueryString, removeQuery } = useSearchProductContext();
  const [filter, setFilter] = useState(false);
  const [sorter, setSorter] = useState(false);
  const [categories, setCategories] = useState([]);
  const formatter = (value) => `${new Intl.NumberFormat().format(value)}₮`;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const { categories } = await getCategory("product");
      setCategories(categories);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

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
        <div className="custom-container">
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
                      className={`categoryname ${
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
        </div>
      </div>
    </>
  );
};

export default MobileProductSearch;
