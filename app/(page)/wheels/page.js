import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleAnalytics from "components/GoogleAnalytics";
import MobileWheelSearch from "components/Wheel/MobileWheelSearch";
import SearchWheelBox from "components/Wheel/search/SearchWheelBox";
import WheelList from "components/Wheel/WheelList";
import Link from "next/link";

export default function Page() {
  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      ) : null}
      <MobileWheelSearch />
      <section className="pd-4">
        <div className="custom-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="container-bread">
                <li className="breadcrumb-link">
                  <Link href="/">
                    <img src="/images/home-icon.png" />
                  </Link>
                </li>
                <li className="breadcrumb-separator">
                  <FontAwesomeIcon icon={faChevronRight} />
                </li>
                <li className="breadcrumb-link">
                  <Link href="/wheels">Обуд</Link>
                </li>
              </div>
            </div>
          </div>
          <div className="row main-wheels">
            <div className="col-xl-3 col-lg-12">
              <SearchWheelBox />
            </div>
            <div className="col-xl-9 col-lg-12">
              <WheelList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
