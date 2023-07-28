"use client";
import {
  faClose,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import CartNotFound from "components/Generals/CartFound";
import Spinner from "components/Generals/Spinner";
import UserNotFound from "components/Generals/UserFound";
import CartProductItem from "components/Product/CartProductItem";
import { useAuthContext } from "context/authContext";
import { useCartContext } from "context/cartContext";
import { useNotificationContext } from "context/notificationContext";
import { usePayContext } from "context/payContext";
import base from "lib/base";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const [form] = Form.useForm();
  const { cart, cartCheck, total, delivery, increase, info, setInfo } =
    useCartContext();

  const { createOrder } = usePayContext();

  const { contentLoad, setContentLoad } = useNotificationContext();
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (total <= 0 && cart && cart.length > 0)
      cartCheck().catch((err) => console.log(err));
  }, [total, cart]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ ...user });
    }
  }, [user]);

  const handlePay = async () => {
    setContentLoad(true);
    const result = await createOrder().catch((err) => console.log(err));
    setContentLoad(false);
    if (result && result.status === true) {
      router.push(`/userprofile/orders/${result.order._id}`);
    }
  };

  if (cart.length === 0) {
    return <CartNotFound />;
  }

  if (!user) {
    return <UserNotFound />;
  }

  const handleNext = () => {
    form
      .validateFields()
      .then((values) => {
        setInfo(values);
        router.push("/review");
      })
      .catch((info) => {});
  };

  return (
    <>
      <section style={{ minHeight: "800px" }}>
        <div className="container">
          <div className="row">
            {contentLoad === true && <Spinner />}

            <div className="col-lg-8">
              <h6 className="section-title">Баталгаажуулах</h6>

              <div className="customer-info">
                <h6> Захиалга </h6>
                <div className="bill-product-list">
                  {cart &&
                    cart.map((el) => (
                      <div className="bill-product">
                        <img src={el.picture} />
                        <span>x{el.qty}</span>
                      </div>
                    ))}
                </div>
                <div class="divider-dashed" role="separator"></div>
                <h6> Захиалагч </h6>
                <div className="bill-customer">
                  <strong>
                    {user.lastName} {user.firstName}{" "}
                  </strong>
                  <p>
                    {user.email} {user.phoneNumber}{" "}
                  </p>
                </div>
                <div class="divider-dashed" role="separator"></div>
                <h6> Хүргэлтийн хаяг </h6>
                <p>{user.address}</p>
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

                {delivery.toString() == "true" &&
                  increase.toString() == "false" && (
                    <div className="service">
                      Хүргэлтийн төлбөрийг бүтээгдэхүүний овор хэмжээ хаягын
                      байршлаас хамааран бодож тухайн үед төлнө.
                    </div>
                  )}
                {increase.toString() == "true" &&
                  delivery.toString() == "false" && (
                    <div className="service">
                      Угсралтын төлбөрийг бүтээгдэхүүний овор хэмжээ хаягын
                      байршлаас хамааран бодож тухайн үед төлнө.
                    </div>
                  )}
                {increase.toString() == "true" &&
                  delivery.toString() == "true" && (
                    <div className="service">
                      Угсралт болон хүргэлтийн төлбөрийг бүтээгдэхүүний овор
                      хэмжээ хаягын байршлаас хамааран бодож тухайн үед төлнө.
                    </div>
                  )}
                <div className="cart-btns">
                  <button className="pay-bill-btn" onClick={() => handlePay()}>
                    Төлбөр төлөх
                  </button>
                  <button
                    className="pay-back-btn"
                    onClick={() => router.push("/checkout")}
                  >
                    Өмнөх алхам руу буцах
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
