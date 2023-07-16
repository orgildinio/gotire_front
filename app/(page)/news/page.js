"use client";

import { faClock, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlockLoad from "components/Generals/BlockLoad";
import Loader from "components/Generals/Loader";
import { htmlToText } from "html-to-text";
import base from "lib/base";
import { getMenu } from "lib/menus";
import { getNews } from "lib/news";
import Link from "next/link";
import { useEffect } from "react";
import { useState, Suspense } from "react";

export default function Page() {
  const [news, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState({});
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { menu } = await getMenu(`direct=news`);
      const { news, pagination } = await getNews(`status=true`);
      setPaginate(pagination);
      setMenu(menu);
      setData(news);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  const nextpage = () => {
    const next = async () => {
      const { courses, pagination } = await getNews(
        `status=true&page=${paginate.nextPage}`
      );
      setData((bs) => [...bs, ...courses]);
      setPaginate(pagination);
      setLoading(false);
    };

    if (paginate && paginate.nextPage) {
      setLoading(true);
      next().catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div
        className="pageDetailsHeader"
        style={{
          background:
            menu && menu.cover && menu.cover !== ""
              ? `url("${base.cdnUrl}/${menu.cover}")`
              : `url(/images/header.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <h2> Зөвлөгөө / Мэдээлэл </h2>
          <div className="bread">
            <li>
              <Link href="/"> Нүүр </Link>
            </li>
            <span> /</span>
            <li> {menu && menu.name} </li>
          </div>
        </div>
      </div>
      <section>
        <div className="container news-container-md">
          <Suspense fallback={<Loader />}>
            <div className="row gy-3">
              {news &&
                news.map((data, index) => {
                  return (
                    <div className="col-lg-4">
                      <div className="serivce-col">
                        <Link href={`/news/${data._id}`}>
                          <div className="service-col-img">
                            {data.pictures && data.pictures[0] ? (
                              <img
                                src={`${base.cdnUrl}/450/${data.pictures[0]}`}
                              />
                            ) : (
                              <img src={`/images/not-found.jpg`} />
                            )}
                          </div>
                        </Link>
                        <div className="service-col-content">
                          <Link
                            href={`/news/${data._id}`}
                            className="col-service-title"
                          >
                            {data.name}
                          </Link>
                          <p>
                            {htmlToText(data.details, {
                              limits: 10,
                            }).length > 240
                              ? htmlToText(data.details, {
                                  limits: 10,
                                }).substr(0, 240) + "..."
                              : htmlToText(data.details, {
                                  limits: 10,
                                })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {loading === true && <BlockLoad />}
          </Suspense>
          {paginate && paginate.nextPage && (
            <div className="pagination">
              <button className="more-page" onClick={() => nextpage()}>
                Дараагийн хуудас
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
