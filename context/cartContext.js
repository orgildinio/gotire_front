"use client";
import axios from "axios-base";
import base from "lib/base";
import React, { useState, createContext, useContext } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNotificationContext } from "./notificationContext";
import { usePayContext } from "./payContext";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const { setError, setAlert, setContentLoad } = useNotificationContext();
  const { createQpayAndInvoice } = usePayContext();
  const [cart, setCarts] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["cart"]);
  const [total, setTotal] = useState(0);
  const [isVerfi, setVerfi] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [increase, setIncrease] = useState(false);

  const [info, setInfo] = useState({
    email: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    address: null,
  });

  const cartInit = () => {
    setTotal(0);
    setContentLoad(false);
  };

  const cartClear = () => {
    setDelivery(false);
    setIncrease(false);
    setCarts(() => []);
  };

  const cartAdd = (data) => {
    cartInit();
    const result = cart.filter((el) => el.productInfo == data.productInfo);

    if (result.length === 0) {
      setCarts((bc) => [...bc, data]);
      setAlert(data.name + " сагсанд нэмэгдлээ");
    } else {
      const error = { message: "Өмнө нэмэгдсэн бараа байна" };
      setError(error);
    }
  };

  const cardDelete = (id) => {
    cart.splice(id, 1);
    setCarts(() => [...cart]);
  };

  useEffect(() => {
    if (cookies.cart) {
      setCarts(cookies.cart);
    }
    if (cookies.increase) {
      setIncrease(cookies.increase);
    }
    if (cookies.delivery) {
      setDelivery(cookies.delivery);
    }
  }, []);

  useEffect(() => {
    if (!cart || cart.length > 0) {
      setCookie("cart", JSON.stringify(cart), { path: "/" });
    } else if (cart && cart.length === 0) {
      setCookie("cart", JSON.stringify(""), { path: "/" });
    }
  }, [cart]);

  useEffect(() => {
    if (delivery) {
      setCookie("delivery", delivery);
    }
  }, [delivery]);

  useEffect(() => {
    if (increase) {
      setCookie("increase", increase);
    }
  }, [increase]);

  const qtyChange = (index, qty) => {
    cart[index].qty = qty;
    setCarts((bc) => [...cart]);
  };

  const cartCheck = async () => {
    if (cart && cart.length > 0) {
      setContentLoad(true);
      const result = await axios.post(`/orders/cart`, {
        carts: cart,
      });
      setContentLoad(false);
      if (result) {
        const { products, setProducts, tires, wheels, total } = result.data;

        const cartProducts = products.map((el) => {
          return {
            productInfo: el._id,
            code: el.productCode,
            type: "product",
            name: el.name,
            qty: el.qty,
            total: el.setOf,
            isDiscount: el.isDiscount,
            price: el.price,
            discount: el.discount,
            picture:
              el.pictures && el.pictures[0]
                ? base.cdnUrl + "/150x150/" + el.pictures[0]
                : "/images/no-product.jpg",
          };
        });

        const cartSetProducts = setProducts.map((el) => {
          return {
            productInfo: el._id,
            code: el.setProductCode,
            type: "setProduct",
            name: el.name,
            qty: el.setOf,
            total: el.setOf,
            isDiscount: el.isDiscount,
            price: el.price,
            discount: el.discount,
            picture:
              el.pictures && el.pictures[0]
                ? base.cdnUrl + "/150x150/" + el.pictures[0]
                : "/images/no-product.jpg",
          };
        });

        const cartWheel = wheels.map((el) => {
          return {
            productInfo: el._id,
            code: el.wheelCode,
            type: "wheel",
            name: el.name,
            qty: el.setOf,
            total: el.setOf,
            isDiscount: el.isDiscount,
            price: el.price,
            discount: el.discount,
            picture:
              el.pictures && el.pictures[0]
                ? base.cdnUrl + "/150x150/" + el.pictures[0]
                : "/images/no-product.jpg",
          };
        });

        const cartTire = tires.map((el) => {
          return {
            productInfo: el._id,
            code: el.tireCode,
            type: "tire",
            name: el.name,
            qty: el.setOf,
            total: el.setOf,
            isDiscount: el.isDiscount,
            price: el.price,
            discount: el.discount,
            picture:
              el.pictures && el.pictures[0]
                ? base.cdnUrl + "/150x150/" + el.pictures[0]
                : "/images/no-product.jpg",
          };
        });

        const cartData = [
          ...cartProducts,
          ...cartSetProducts,
          ...cartWheel,
          ...cartTire,
        ];

        setCarts((bf) => cartData);
        setTotal(total);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCarts,
        setInfo,
        info,
        total,
        cartAdd,
        qtyChange,

        cardDelete,
        isVerfi,
        cartClear,
        setVerfi,
        cartCheck,
        delivery,
        setDelivery,
        increase,
        setIncrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
