"use client";

import { faChevronRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSideSearchContext } from "context/sideSearchContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SideSearch = () => {
  const { visible, handleToggle, searchName, mainCategories } =
    useSideSearchContext();
  const router = useRouter();
  const renderMenu = (categories, child = false, parentSlug = "") => {
    let myCategories = [];
    categories &&
      categories.map((el) => {
        myCategories.push(
          <li
            key={el._id}
            className={`side-list ${
              el.children.length > 0 && "side-drop-lists"
            }`}
          >
            <button
              className={`link-side-category`}
              onClick={() =>
                router.push(
                  `/${searchName}s?categoryname=${el.name.toLowerCase()}`
                )
              }
            >
              {el.name} ({el.count})
            </button>

            {el.children.length > 0 && !child ? (
              <ul className={`side-child`}>
                {renderMenu(el.children, true, el.slug)}
              </ul>
            ) : null}
          </li>
        );
      });

    return myCategories;
  };

  return (
    <>
      <div
        className={`black-bg ${visible === false && "displayNone"}`}
        onClick={() => handleToggle()}
      ></div>
      <div className={`side-search-box ${visible === false && "displayNone"}`}>
        <div className="side-search-header">
          <h6>
            {searchName === "tire" && "Дугуй"}{" "}
            {searchName === "wheel" && "Обуд"}
            {searchName === "setproduct" && "Дугуй, обуд"}
          </h6>
          <button onClick={() => handleToggle()}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="side-main">
          {mainCategories && renderMenu(mainCategories)}
          {searchName && (
            <button
              className={`link-side-category`}
              onClick={() => router.push(`/${searchName}s`)}
            >
              Бүгдийг нь үзэх
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SideSearch;
