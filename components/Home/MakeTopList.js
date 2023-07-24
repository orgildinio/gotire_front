"use client";
import base from "lib/base";
import { getMakes } from "lib/tire";
import { useEffect, useState } from "react";
import Link from "next/link";

const MakeTopList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { makes } = await getMakes(`sort=tireCount:ascend&limit=12`);

      if (makes.length > 0) {
        setData(makes);
      }
    };
    fetchData().catch((error) => console.log(error));
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <div className="seaction-header">
            <h4>Дугуйн брэндүүд </h4>
            <p>Хамгийн түгээмэл Монголд өргөн хэрэглэгддэг брэндүүд</p>
          </div>
          <div className="home-tire-brands">
            <div className="row gy-4">
              {data &&
                data.map((make) => (
                  <div
                    className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                    key={make._id}
                  >
                    <Link href={`/tires?make=${make.name.toLowerCase()}`}>
                      <div className="tire-brand">
                        {make.logo ? (
                          <img src={`${base.cdnUrl}/450/${make.logo}`} />
                        ) : (
                          <img src={`/images/no-brand.png`} />
                        )}
                        <div className="tire-count"> {make.tireCount} </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
            <Link href="/tires" className="more-btn">
              Бүх брэндийг үзэх
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MakeTopList;
