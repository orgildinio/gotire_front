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
import PayModule from "components/Pay/payModule";
import CartProductItem from "components/Product/CartProductItem";
import { useAuthContext } from "context/authContext";
import { useCartContext } from "context/cartContext";
import { useNotificationContext } from "context/notificationContext";
import { usePayContext } from "context/payContext";
import base from "lib/base";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const [form] = Form.useForm();
  const { cart, cartCheck, total, delivery, increase, info, setInfo } =
    useCartContext();

  const { visible } = usePayContext();

  const { contentLoad } = useNotificationContext();
  const { user, userInfoChange } = useAuthContext();
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

  const requiredRule = {
    required: true,
    message: "Тус талбарыг заавал бөглөнө үү",
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
        router.push("/review");
        setInfo(values);
        userInfoChange(values);
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
              <Form layout="vertical" form={form}>
                <h6 className="section-title">Захиалагчийн мэдээлэл</h6>

                <div className="customer-info">
                  <div className="row">
                    <div className="col-6">
                      <Form.Item
                        label="Овог"
                        name="lastName"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="Овог" />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <Form.Item
                        label="Нэр"
                        name="firstName"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="Нэр" />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <Form.Item
                        label="Утасны дугаар"
                        name="phoneNumber"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <InputNumber
                          placeholder="Утасны дугаар"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <Form.Item
                        label="И-Мэйл хаяг"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Тус талбарыг заавал бөглөнө үү",
                          },
                          {
                            type: "email",
                            message: "Имэйл хаяг буруу байна!",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input placeholder="Имэйл" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <h6 className="section-title">Хүргэлтийн хаяг</h6>
                <div className="customer-info">
                  <Form.Item
                    label="Хүргүүлэх хаягаа оруулна уу"
                    name="address"
                    rules={[requiredRule]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </div>
              </Form>
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
                  <button className="pay-bill-btn" onClick={() => handleNext()}>
                    Үргэлжлүүлэх
                  </button>
                  <button
                    className="pay-back-btn"
                    onClick={() => router.push("/cart")}
                  >
                    Өмнөх алхам руу буцах
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PayModule />
    </>
  );
}
