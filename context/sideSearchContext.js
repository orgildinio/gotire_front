"use client";

import { getCategory } from "lib/categories";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const sideSearchContext = createContext({});

export const SideSearchProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [searchName, setSearchName] = useState(null);
  const [mainCategories, setMainCategories] = useState(null);

  const handleToggle = (name) => {
    setSearchName(name);
    setVisible((bv) => (bv === true ? false : true));
  };

  useEffect(() => {
    const fetchData = async (name) => {
      const { categories } = await getCategory(name);
      setMainCategories(categories);
    };

    if (searchName) {
      fetchData(searchName).catch((err) => console.log(err));
    } else {
      setMainCategories(null);
    }
  }, [searchName]);

  return (
    <sideSearchContext.Provider
      value={{ visible, handleToggle, mainCategories, searchName, setVisible }}
    >
      {children}
    </sideSearchContext.Provider>
  );
};

export const useSideSearchContext = () => useContext(sideSearchContext);
