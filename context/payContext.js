"use client";
import axios from "axios-base";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useAuthContext } from "./authContext";
import { useCartContext } from "./cartContext";
import { useNotificationContext } from "./notificationContext";

const PayContext = createContext({});

export const PayProvider = ({ children }) => {
  const { setContentLoad, setError, setAlert } = useNotificationContext();
  const { cartClear, cart, delivery, increase } = useCartContext();
  const [orderData, setOrderData] = useState(null);
  const { user: info } = useAuthContext();
  const [visible, setVisible] = useState(false);
  const [invoice, setInvoice] = useState(null);

  const router = useRouter();

  const closeOrder = async (orderId) => {
    setContentLoad(true);

    try {
      const result = await axios.put(`/orders/user/${orderId}`);
      setContentLoad(false);
      if (result) {
        router.push("/userprofile/orders");
      }
    } catch (err) {
      setContentLoad(false);
      setError(err);
    }
  };

  const createOrder = async () => {
    setContentLoad(true);

    try {
      const data = {
        carts: cart,
        firstName: info.firstName,
        lastName: info.lastName,
        phoneNumber: info.phoneNumber,
        email: info.email,
        delivery,
        increase,
      };

      const result = await axios.post(`/orders`, data);
      if (result && result.data) {
        cartClear();
        setOrderData(result.data.data);
        setContentLoad(false);
        return { status: true, order: result.data.data };
      } else {
        setOrderData(null);
        setContentLoad(false);
        return { status: false };
      }
    } catch (err) {
      setContentLoad(false);
      setError(err);
    }
  };

  const createQpay = async (data) => {
    setContentLoad(true);
    try {
      const result = await axios.post("/payment", data);
      if (result && result.data) {
        setInvoice(result.data.invoice);
      }
    } catch (err) {
      setError(err);
      router.push("/userprofile/orders");
    }
    setContentLoad(false);
  };

  const checkPayment = async (invoiceId) => {
    setContentLoad(true);
    try {
      const paidCheck = await axios.get(`/payment/check?invoice=${invoiceId}`);
      setAlert("Төлбөр амжиллтай төлөгдлөө");
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
    setContentLoad(false);
  };

  return (
    <PayContext.Provider
      value={{
        createOrder,
        setVisible,
        visible,
        createQpay,
        invoice,
        checkPayment,
        closeOrder,
      }}
    >
      {children}
    </PayContext.Provider>
  );
};

export const usePayContext = () => useContext(PayContext);
