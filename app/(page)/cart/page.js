"use client";
import {
  faClose,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartNotFound from "components/Generals/CartFound";
import Spinner from "components/Generals/Spinner";
import CartProductItem from "components/Product/CartProductItem";
import { useCartContext } from "context/cartContext";
import { useNotificationContext } from "context/notificationContext";
import base from "lib/base";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const {
    cart,
    cardDelete,
    cartClear,
    cartCheck,
    total,
    delivery,
    setDelivery,
    increase,
    setIncrease,
  } = useCartContext();
  const { contentLoad } = useNotificationContext();
  const router = useRouter();

  if (cart.length === 0) {
    return <CartNotFound />;
  }

  useEffect(() => {
    cartCheck().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <section style={{ minHeight: "800px" }}>
        <div className="container">
          <div className="row">
            {contentLoad === true && <Spinner />}
            <div className="col-lg-8">
              <h6 className="section-title">
                Таны сагс
                <button onClick={() => cartClear()}>
                  <FontAwesomeIcon icon={faTrash} /> Сагс хоослох
                </button>
              </h6>

              <div className="cart-list">
                {cart &&
                  cart.length > 0 &&
                  cart.map((el, index) => {
                    if (el.type !== "product") {
                      return (
                        <>
                          <div className="cart-item">
                            <div className="cart-product-info">
                              <div className="picture-box">
                                {el.picture && <img src={`${el.picture}`} />}
                              </div>
                              <div className="cart-infos">
                                <span className="cart-cat">
                                  {el.type === "tire" && "Дугуй"}
                                  {el.type === "wheel" && "Обуд"}
                                  {el.type === "setProduct" && "Дугуй, Обуд"}
                                  {el.type === "product" && "Сэлбэг"} {el.code}
                                </span>
                                <p> {el.name}</p>
                                {el.type !== "product" ? (
                                  <span className="qty">
                                    Тоо ширхэг: {el.total}
                                  </span>
                                ) : (
                                  <span className="qty">
                                    {" "}
                                    Үлдэгдэл: {el.total}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="cart-right-box">
                              {el.isDiscount === false ? (
                                <h5>
                                  {new Intl.NumberFormat().format(el.price)}₮
                                </h5>
                              ) : (
                                <>
                                  <span className="cart-discount">
                                    {new Intl.NumberFormat().format(el.price)}₮
                                  </span>
                                  <h5>
                                    {new Intl.NumberFormat().format(
                                      el.discount
                                    )}
                                    ₮
                                  </h5>
                                </>
                              )}
                              <div className="cart-control-box">
                                <button onClick={() => cardDelete(index)}>
                                  <FontAwesomeIcon icon={faClose} />
                                </button>
                              </div>
                            </div>
                          </div>
                          {index + 1 !== cart.length && (
                            <div
                              className="divider-dashed"
                              role="separator"
                            ></div>
                          )}
                        </>
                      );
                    } else {
                      return (
                        <>
                          <CartProductItem el={el} index={index} />
                          {index + 1 !== cart.length && (
                            <div
                              className="divider-dashed"
                              role="separator"
                            ></div>
                          )}
                        </>
                      );
                    }
                  })}
              </div>
            </div>
            <div className="col-lg-4">
              <h6 className="section-title">Төлбөрийн мэдээлэл</h6>
              <div className="cart-side">
                <div className="bills">
                  <div className="bill-main">
                    <p className="bill-title">Бүтээгдэхүүн</p>
                    <div className="bill-list">
                      {cart &&
                        cart.length > 0 &&
                        cart.map((el, index) => (
                          <li>
                            {el.name}
                            <div className="bill-price">
                              <span className="bill-qty">x {el.qty}</span>
                              {el.type == "product" ? (
                                <p>
                                  {new Intl.NumberFormat().format(
                                    el.isDiscount === true
                                      ? el.discount
                                      : el.price * el.qty
                                  )}
                                  ₮
                                </p>
                              ) : (
                                <p>
                                  {new Intl.NumberFormat().format(
                                    el.isDiscount === true
                                      ? el.discount
                                      : el.price
                                  )}
                                  ₮
                                </p>
                              )}
                            </div>
                          </li>
                        ))}
                    </div>
                    <div className="divider-dashed" role="separator"></div>
                    <div className="bill-total">
                      <p> Нийт төлөх дүн: </p>
                      <strong> {new Intl.NumberFormat().format(total)}₮</strong>
                    </div>
                  </div>
                </div>
                <div className="service">
                  <input
                    type="checkbox"
                    checked={delivery}
                    onChange={() =>
                      setDelivery((bd) => (bd == true ? false : true))
                    }
                  />
                  Хүргэлтээр авна
                </div>
                <div className="service">
                  <input
                    type="checkbox"
                    checked={increase}
                    onChange={() =>
                      setIncrease((bi) => (bi == true ? false : true))
                    }
                  />{" "}
                  Угсарлт хийлгүүлнэ
                </div>
                <div className="cart-btns">
                  <button
                    className="pay-bill-btn"
                    onClick={() => router.push("/checkout")}
                  >
                    {" "}
                    Худалдан авах{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
