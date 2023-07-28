"use client";
import { faArrowLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import RandomTire from "components/Product/RandomTire";
import { useCartContext } from "context/cartContext";
import base from "lib/base";
import { getTire } from "lib/tire";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

export default function Page({ params: { slug } }) {
  const [tire, setTire] = useState(null);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { cartAdd } = useCartContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const { tire } = await getTire(slug);

      setTire(tire);
      setLoading(false);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (tire) {
      let img = [];
      tire.pictures.map((picture) =>
        img.push({
          original: base.cdnUrl + "/" + picture,
          thumbnail: base.cdnUrl + "/150x150/" + picture,
        })
      );
      setImage(img);
    }
  }, [tire]);

  const handleCart = () => {
    if (tire) {
      const cartData = {
        productInfo: tire._id,
        code: tire.tireCode,
        type: "tire",
        name: tire.name,
        qty: tire.setOf,
        total: tire.setOf,
        isDiscount: tire.isDiscount,
        price: tire.price,
        discount: tire.discount,
        picture:
          tire.pictures && tire.pictures[0]
            ? base.cdnUrl + "/150x150/" + tire.pictures[0]
            : "/images/no-product.jpg",
      };
      cartAdd(cartData);
    }
  };

  const handleShop = () => {
    if (tire) {
      const cartData = {
        productInfo: tire._id,
        code: tire.tireCode,
        type: "tire",
        name: tire.name,
        qty: tire.setOf,
        total: tire.setOf,
        isDiscount: tire.isDiscount,
        price: tire.price,
        discount: tire.discount,
        picture:
          tire.pictures && tire.pictures[0]
            ? base.cdnUrl + "/150x150/" + tire.pictures[0]
            : "/images/no-product.jpg",
      };
      cartAdd(cartData);
      router.push("/cart");
    }
  };

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

  if (!tire) {
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
                    <h2>{tire.name}</h2>
                    <span>
                      {tire.make.name} #{tire.tireCode}
                    </span>
                  </div>
                </div>
              </div>
              <ImageGallery items={image} />
            </div>
            <div className="col-lg-4">
              <div className="product-side sticky-top">
                {tire.isDiscount === false && (
                  <div className="price-box">
                    <span> Үндсэн үнэ: </span>
                    <h4> {new Intl.NumberFormat().format(tire.price)}₮ </h4>
                  </div>
                )}
                {tire.isDiscount === true && (
                  <div className="discount-box">
                    <div className="discount-price">
                      <span> Хямдралтай үнэ: </span>
                      <h4>{new Intl.NumberFormat().format(tire.discount)}₮ </h4>
                    </div>
                    <div className="init-price">
                      <span> Анхны үнэ: </span>
                      <h4>{new Intl.NumberFormat().format(tire.price)}₮ </h4>
                    </div>
                  </div>
                )}
                <div className="divider-dashed" role="separator"></div>

                <table className="products-dtl">
                  <tr>
                    <th>Үйлдвэрлэгч: </th>
                    <td>
                      <Link
                        href={`/tires?make=${tire.make.name.toLowerCase()}`}
                      >
                        <img src={base.cdnUrl + "/450/" + tire.make.logo} />{" "}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th>Хэмжээ: </th>
                    <td>
                      {tire.width}/{tire.height}R{tire.diameter}
                    </td>
                  </tr>
                  <tr>
                    <th>Ашиглалт: </th>
                    <td>{tire.use === 100 ? "Шинэ" : tire.use + "%"} </td>
                  </tr>
                  <tr>
                    <th>Улирал: </th>
                    <td>
                      {(tire.season === "winter" && "Өвлийн") ||
                        (tire.season === "summer" && "Зуны") ||
                        (tire.season === "allin" && "Дөрвөн улиралын")}
                    </td>
                  </tr>
                  <tr>
                    <th>Багц: </th>
                    <td>{tire.setOf} ширхэг</td>
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
                    __html: tire.details,
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
