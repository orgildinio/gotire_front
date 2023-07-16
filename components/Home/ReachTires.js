"use client";
import { getMostTires } from "lib/tire";
import Link from "next/link";
import { useEffect, useState } from "react";

const ReachTires = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { tires } = await getMostTires();
      setData(tires);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  return (
    <>
      {" "}
      <section className="background-gray">
        <div className="container">
          <div className="seaction-header">
            <h4> Эрэлттэй дугуйнууд </h4>
          </div>
          <div className="most-tires ">
            <div className="row gy-4">
              {data &&
                data.map((el) => (
                  <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6">
                    <Link
                      href={`/tires?tiresize=${el.width}/${el.height}R${el.diameter}`}
                    >
                      <div className="most-tire">
                        {el.width}/{el.height}R{el.diameter}
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          <Link href="/tires" className="more-btn custom-more">
            Бүх дугуйг үзэх
          </Link>
        </div>
      </section>
    </>
  );
};

export default ReachTires;
