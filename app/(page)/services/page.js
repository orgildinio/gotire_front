"use client";
import BlockLoad from "components/Generals/BlockLoad";
import Loader from "components/Generals/Loader";
import { htmlToText } from "html-to-text";
import base from "lib/base";
import { getMenu } from "lib/menus";
import { getServices } from "lib/services";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const [menu, setMenu] = useState(null);
  const [services, setServices] = useState([]);
  const [paginate, setPaginate] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { menu } = await getMenu(`direct=services`);
      const { services, pagination } = await getServices(`status=true`);
      setMenu(menu);
      setServices(services);
      setPaginate(pagination);
      setLoader(false);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  const nextpage = () => {
    const next = async () => {
      const { services, pagination } = await getServices(
        `status=true&page=${paginate.nextPage}`
      );
      setServices((bs) => [...bs, ...services]);
      setPaginate(pagination);
      setLoader(false);
    };

    if (paginate && paginate.nextPage) {
      setLoader(true);
      next().catch((error) => console.log(error));
    }
  };

  return (
    <main>
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
          <h2> Манай үйлчилгээнүүд </h2>
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
        <div className="container">
          <Suspense fallback={<Loader />}>
            <div className="row gy-3">
              {services &&
                services.map((service, index) => {
                  return (
                    <div className="col-lg-4">
                      <div className="serivce-col">
                        <Link href={`/services/${service.slug}`}>
                          <div className="service-col-img">
                            {service.pictures && service.pictures[0] ? (
                              <img
                                src={`${base.cdnUrl}/450/${service.pictures[0]}`}
                              />
                            ) : (
                              <img src={`/images/not-found.jpg`} />
                            )}
                          </div>
                        </Link>
                        <div className="service-col-content">
                          <Link
                            href={`/services/${service.slug}`}
                            className="col-service-title"
                          >
                            {service.name}
                          </Link>
                          <p>
                            {htmlToText(service.details, {
                              limits: 10,
                            }).length > 240
                              ? htmlToText(service.details, {
                                  limits: 10,
                                }).substr(0, 240) + "..."
                              : htmlToText(service.details, {
                                  limits: 10,
                                })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {loader === true && <BlockLoad />}
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
    </main>
  );
}
