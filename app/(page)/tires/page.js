import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderTireBrands from "components/Tire/HeaderTireBrands";
import MobileTireSearch from "components/Tire/MobileTireSearch";
import ProductList from "components/Tire/ProductList";
import SearchBox from "components/Tire/search/SearchBox";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <MobileTireSearch />
      <section className="pd-4">
        <div className="custom-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="container-bread">
                <li className="breadcrumb-link">
                  <Link href="/">
                    <img src="/images/home-icon.png" />{" "}
                  </Link>
                </li>
                <li className="breadcrumb-separator">
                  <FontAwesomeIcon icon={faChevronRight} />
                </li>
                <li className="breadcrumb-link">
                  <Link href="/tires">Дугуй</Link>
                </li>
              </div>
            </div>
            <div className="col-lg-12">
              <HeaderTireBrands />
            </div>
          </div>
        </div>

        <div className="custom-container">
          <div className="row">
            <div className="col-xl-3 col-lg-12">
              <SearchBox />
            </div>
            <div className="col-xl-9 col-lg-12">
              <ProductList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
