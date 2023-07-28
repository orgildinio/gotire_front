import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import SearchBox from "components/SetProduct/search/SearchBox";
import SetProductList from "components/SetProduct/setProductList";
import MobileSetProductSearch from "components/SetProduct/MobileSetProductSearch";

export default function Page() {
  return (
    <>
      <MobileSetProductSearch />
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
                  <Link href="/setproducts">Дугуй, обуд</Link>
                </li>
              </div>
            </div>
          </div>
        </div>
        <div className="custom-container" style={{ marginTop: "25px" }}>
          <div className="row">
            <div className="col-xl-3 col-lg-12">
              <SearchBox />
            </div>
            <div className="col-xl-9 col-lg-12">
              <SetProductList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
