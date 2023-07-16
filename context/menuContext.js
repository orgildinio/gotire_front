"use client";
import { getMenus } from "lib/menus";
import Link from "next/link";
import React, { useState, createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const MenuContext = createContext({});

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const [menu, setMenu] = useState([]);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname && menu.length > 0) {
      setMenus(renderMenu(menu));
    }
  }, [pathname, menu]);

  useState(() => {
    const fetchData = async () => {
      const { menus: resultMenus } = await getMenus();

      if (resultMenus) {
        setMenus(() => renderMenu(resultMenus));
        setMenu(resultMenus);
      }
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  const renderMenu = (categories, child = false, parentSlug = "") => {
    let myCategories = [];
    categories &&
      categories.map((el) => {
        myCategories.push(
          <li key={el._id} className={el.children.length > 0 && "dropMenu"}>
            {el.isDirect === true && (
              <Link
                href={el.direct}
                className={`header-link ${el.direct === pathname && "active"}`}
              >
                {el.name}
                {el.children.length > 0 && "dropMenu" && (
                  <span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                )}
              </Link>
            )}
            {el.isModel === true && (
              <Link
                href={`/${el.model}`}
                className={`header-link ${
                  "/" + el.model === pathname && "active"
                }`}
                scroll={false}
              >
                {el.name}
                {el.children.length > 0 && "dropMenu" && (
                  <span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                )}
              </Link>
            )}

            {el.isDirect === false && el.isModel === false && (
              <Link
                href={`/page/${el.slug}`}
                className={`header-link ${
                  "/page/" + el.slug === pathname && "active"
                }`}
                scroll={false}
              >
                {el.name}
                {el.children.length > 0 && "dropMenu" && (
                  <span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                )}
              </Link>
            )}

            {el.children.length > 0 && !child ? (
              <ul className={`dropdownMenu`}>
                {renderMenu(el.children, true, el.slug)}
              </ul>
            ) : null}
          </li>
        );
      });

    return myCategories;
  };

  return (
    <MenuContext.Provider value={{ menus }}>{children}</MenuContext.Provider>
  );
};

export const useMenuContext = () => useContext(MenuContext);
