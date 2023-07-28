"use client";
import { faArrowLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import RandomTire from "components/Product/RandomTire";
import { useCartContext } from "context/cartContext";
import base from "lib/base";
import { getSetProduct } from "lib/setProduct";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

export default function Page({ params: { slug } }) {
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { cartAdd } = useCartContext();

  const handleCart = () => {
    if (product) {
      const cartData = {
        productInfo: product._id,
        type: "setProduct",
        code: product.setofCode,
        name: product.name,
        qty: product.setOf,
        total: product.setOf,
        isDiscount: product.isDiscount,
        price: product.price,
        discount: product.discount,
        picture:
          product.pictures && product.pictures[0]
            ? base.cdnUrl + "/150x150/" + product.pictures[0]
            : "/images/no-product.jpg",
      };
      cartAdd(cartData);
    }
  };

  const handleShop = () => {
    if (product) {
      const cartData = {
        productInfo: product._id,
        type: "setProduct",
        code: product.setofCode,
        name: product.name,
        qty: product.setOf,
        total: product.setOf,
        isDiscount: product.isDiscount,
        price: product.price,
        discount: product.discount,
        picture:
          product.pictures && product.pictures[0]
            ? base.cdnUrl + "/150x150/" + product.pictures[0]
            : "/images/no-product.jpg",
      };
      cartAdd(cartData);
      router.push("/cart");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const { product } = await getSetProduct(slug);

      setProduct(product);
      setLoading(false);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (product) {
      let img = [];
      product.pictures.map((picture) =>
        img.push({
          original: base.cdnUrl + "/" + picture,
          thumbnail: base.cdnUrl + "/150x150/" + picture,
        })
      );
      setImage(img);
    }
  }, [product]);

  if (loading === true) {
    return (
      <>
        <section>
          <div className="container">
            <Loader />
          </div>
        </section>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <section>
          <NotFound />
        </section>
      </>
    );
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page_detials_header">
                <div className="page_header_left">
                  <button className="page-back" onClick={() => router.back()}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <div className="page-header-title">
                    <h2>{product.name}</h2>
                    <span>
                      {product.tire.make.name} #{product.setofCode}
                    </span>
                  </div>
                </div>
              </div>
              <ImageGallery items={image} />
            </div>
            <div className="col-lg-4">
              <div className="product-side sticky-top">
                {product.isDiscount === false && (
                  <div className="price-box">
                    <span> Үндсэн үнэ: </span>
                    <h4> {new Intl.NumberFormat().format(product.price)}₮ </h4>
                  </div>
                )}
                {product.isDiscount === true && (
                  <div className="discount-box">
                    <div className="discount-price">
                      <span> Хямдралтай үнэ: </span>
                      <h4>
                        {new Intl.NumberFormat().format(product.discount)}₮{" "}
                      </h4>
                    </div>
                    <div className="init-price">
                      <span> Анхны үнэ: </span>
                      <h4>{new Intl.NumberFormat().format(product.price)}₮ </h4>
                    </div>
                  </div>
                )}
                <div className="divider-dashed" role="separator"></div>
                <h6 style={{ margin: "15px 0px", fontSize: "14px" }}>
                  Дугуйны мэдээлэл
                </h6>
                <table className="products-dtl">
                  <tr>
                    <th>Үйлдвэрлэгч: </th>
                    <td>
                      <Link
                        href={`/tires?make=${product.tire.make.name.toLowerCase()}`}
                      >
                        <img
                          src={base.cdnUrl + "/450/" + product.tire.make.logo}
                        />{" "}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th>Хэмжээ: </th>
                    <td>
                      {product.tire.width}/{product.tire.height}R
                      {product.tire.diameter}
                    </td>
                  </tr>
                  <tr>
                    <th>Ашиглалт: </th>
                    <td>
                      {product.tire.use === 100
                        ? "Шинэ"
                        : product.tire.use + "%"}{" "}
                    </td>
                  </tr>
                  <tr>
                    <th>Улирал: </th>
                    <td>
                      {(product.tire.season === "winter" && "Өвлийн") ||
                        (product.tire.season === "summer" && "Зуны") ||
                        (product.tire.season === "allin" && "Дөрвөн улиралын")}
                    </td>
                  </tr>
                  <tr>
                    <th>Тоо ширхэг: </th>
                    <td>{product.setOf} ширхэг</td>
                  </tr>
                </table>
                <h6 style={{ margin: "15px 0px", fontSize: "14px" }}>
                  Обудын мэдээлэл
                </h6>

                <table className="products-dtl">
                  <tr>
                    <th>Диаметр: </th>
                    <td>{product.wheel.diameter} инч</td>
                  </tr>
                  <tr>
                    <th>Өргөн (J): </th>
                    <td>{product.wheel.width}</td>
                  </tr>

                  <tr>
                    <th>Болтны зай: </th>
                    <td>{product.wheel.boltPattern} </td>
                  </tr>

                  <tr>
                    <th>Болтны хэмжээ: </th>
                    <td>{product.wheel.threadSize} </td>
                  </tr>
                  <tr>
                    <th>Голын диаметр: </th>
                    <td>{product.wheel.centerBore} </td>
                  </tr>
                  <tr>
                    <th>RIM: </th>
                    <td>{product.wheel.rim} </td>
                  </tr>
                </table>

                <div className="divider-dashed" role="separator"></div>
                <div className="product-shop-btns">
                  <button className="cart-btn" onClick={() => handleCart()}>
                    Сагсанд нэмэх
                  </button>
                  <button className="shop-btn" onClick={() => handleShop()}>
                    Худалдан авах
                  </button>
                </div>
                <div className="divider-dashed" role="separator"></div>
                <div className="product-services">
                  <div className="product-service"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product-more">
                <h5> Дэлгэрэнгүй мэдээлэл</h5>

                <div
                  className={`product-detials`}
                  dangerouslySetInnerHTML={{
                    __html: product.details,
                  }}
                ></div>
              </div>
              <RandomTire />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
