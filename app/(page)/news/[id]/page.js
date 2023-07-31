"use client";
import { faClock, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import Share from "components/Generals/Share";
import GoogleAnalytics from "components/GoogleAnalytics";
import NotFound from "components/Service/notFound";
import ServiceDetails from "components/Service/service-details";
import base from "lib/base";
import { getContent } from "lib/news";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params: { id } }) {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNews = async () => {
      const { news } = await getContent(id);
      if (news) setNews(news);
      setLoading(false);
    };

    fetchNews().catch((error) => console.log(error));
  }, []);

  if (!news) {
    if (loading === true) {
      return (
        <section>
          <div className="container">
            <Loader />
          </div>{" "}
        </section>
      );
    } else {
      <section>
        <NotFound />
      </section>;
    }
  } else {
    return (
      <>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <main>
          <ServiceDetails page={news} />
        </main>
      </>
    );
  }
}
