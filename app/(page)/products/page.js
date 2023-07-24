import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBox from "components/Product/search/SearchBox";
import ProductList from "components/Product/ProductList";
import Link from "next/link";
import MobileProductSearch from "components/Product/MobileProductSearch";

export default function Page() {
  return (
    <>
      <MobileProductSearch />
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
                  <Link href="/products">Бусад сэлбэгүүд</Link>
                </li>
              </div>
            </div>
          </div>
        </div>
        <div className="custom-container" style={{ marginTop: "25px" }}>
          <div className="row">
            <div className="col-xl-2 col-lg-12">
              <SearchBox />
            </div>
            <div className="col-xl-10 col-lg-12">
              <ProductList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}