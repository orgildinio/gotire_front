"use client";
import { faArrowLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import RandomTire from "components/Product/RandomTire";
import base from "lib/base";
import { getWheel } from "lib/wheel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

export default function Page({ params: { slug } }) {
  const [wheel, setWheel] = useState(null);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const { wheel } = await getWheel(slug);
      setWheel(wheel);
      setLoading(false);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (wheel) {
      let img = [];
      wheel.pictures.map((picture) =>
        img.push({
          original: base.cdnUrl + "/" + picture,
          thumbnail: base.cdnUrl + "/150x150/" + picture,
        })
      );
      setImage(img);
    }
  }, [wheel]);

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

  if (!wheel) {
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
                    <h2>{wheel.name}</h2>
                    <span>#{wheel.wheelCode}</span>
                  </div>
                </div>
              </div>
              <ImageGallery items={image} />
            </div>
            <div className="col-lg-4">
              <div className="product-side sticky-top">
                {wheel.isDiscount === false && (
                  <div className="price-box">
                    <span> Үндсэн үнэ: </span>
                    <h4> {new Intl.NumberFormat().format(wheel.price)}₮ </h4>
                  </div>
                )}
                {wheel.isDiscount === true && (
                  <div className="discount-box">
                    <div className="discount-price">
                      <span> Хямдралтай үнэ: </span>
                      <h4>
                        {new Intl.NumberFormat().format(wheel.discount)}₮{" "}
                      </h4>
                    </div>
                    <div className="init-price">
                      <span> Анхны үнэ: </span>
                      <h4>{new Intl.NumberFormat().format(wheel.price)}₮ </h4>
                    </div>
                  </div>
                )}
                <div className="divider-dashed" role="separator"></div>

                <table className="products-dtl">
                  <tr>
                    <th>Диаметр: </th>
                    <td>R{wheel.diameter}</td>
                  </tr>
                  <tr>
                    <th>Өргөн J: </th>
                    <td>{wheel.width}</td>
                  </tr>
                  <tr>
                    <th>RIM: </th>
                    <td>{wheel.rim} </td>
                  </tr>

                  <tr>
                    <th>Багц: </th>
                    <td>{wheel.setOf} ширхэг</td>
                  </tr>

                  <tr>
                    <th>Болтны зай: </th>
                    <td>{wheel.boltPattern} </td>
                  </tr>
                  <tr>
                    <th>Дотогшоо суултын хэмжээ: </th>
                    <td>{wheel.inSet} </td>
                  </tr>
                  <tr>
                    <th>Гадагшаа offset хэмжээ: </th>
                    <td>{wheel.offSet} </td>
                  </tr>
                  <tr>
                    <th>Болтны хэмжээ: </th>
                    <td>{wheel.threadSize} </td>
                  </tr>
                  <tr>
                    <th>Голын диаметр: </th>
                    <td>{wheel.centerBore} </td>
                  </tr>
                </table>

                <div className="divider-dashed" role="separator"></div>
                <div className="product-shop-btns">
                  <button className="cart-btn">Сагсанд нэмэх</button>
                  <button className="shop-btn">Худалдан авах</button>
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
                    __html: wheel.details,
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
