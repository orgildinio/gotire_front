"use client";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartContext } from "context/cartContext";
import { useEffect, useState } from "react";

const CartProductItem = ({ el, index }) => {
  const { cardDelete, qtyChange, cartCheck } = useCartContext();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (el) {
      setQty(parseInt(el.qty));
    }
  }, [el]);

  return (
    <>
      <div className="cart-item">
        <div className="cart-product-info">
          <div className="picture-box">
            {el.picture && <img src={`${el.picture}`} />}
          </div>
          <div className="cart-infos">
            <span className="cart-cat">
              {el.type === "product" && "Сэлбэгүүд"} {el.code}
            </span>
            <p> {el.name}</p>
            {el.type !== "product" ? (
              <span className="qty"> Тоо ширхэг: {el.total}</span>
            ) : (
              <span className="qty"> Үлдэгдэл: {el.total}</span>
            )}
          </div>
        </div>
        <div className="qty-box">
          <div className="qty-controls">
            {el.isDiscount === false ? (
              <h5>{new Intl.NumberFormat().format(el.price)}₮ x</h5>
            ) : (
              <>
                <span className="cart-discount">
                  {new Intl.NumberFormat().format(el.price)}₮
                </span>
                <h5>{new Intl.NumberFormat().format(el.discount)}₮ x </h5>
              </>
            )}

            <button
              className="qty-control"
              onClick={() => {
                parseInt(qty) - 1 > 0 && setQty((bq) => bq - 1);
                parseInt(qty) - 1 > 0 && qtyChange(index, parseInt(qty) - 1);
                cartCheck();
              }}
            >
              -
            </button>
            <p> {el.qty} </p>
            <button
              className="qty-control"
              onClick={() => {
                parseInt(qty) + 1 <= el.total && setQty((bq) => bq + 1);
                parseInt(qty) + 1 <= el.total &&
                  qtyChange(index, parseInt(qty) + 1);
                cartCheck();
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="cart-right-box">
          {el.isDiscount === false ? (
            <h5>{new Intl.NumberFormat().format(el.price * parseInt(qty))}₮</h5>
          ) : (
            <>
              <span className="cart-discount">
                {new Intl.NumberFormat().format(el.price * parseInt(qty))}₮
              </span>
              <h5>
                {new Intl.NumberFormat().format(el.discount * parseInt(qty))}₮
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
    </>
  );
};

export default CartProductItem;
