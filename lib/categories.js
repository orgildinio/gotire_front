import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const getCategory = async (name) => {
  let categories = [];
  let error = null;

  const res = await fetcher(`${base.apiUrl}/${name}categories?status=true`, {
    next: { revalidate: 10 },
  });

  if (res) {
    categories = res.data;
  }
  return { categories, error };
};
