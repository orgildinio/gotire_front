"use client";

import base from "lib/base";

const { useCartContext } = require("context/cartContext");
const { useMenuContext } = require("context/menuContext");
const { useWebInfoContext } = require("context/webinfoContext");
import { useAuthContext } from "context/authContext";
const { useEffect } = require("react");

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import MobileMenu from "components/Generals/MobileMenu";
import Aos from "aos";
import { useRouter } from "next/navigation";

const Header = () => {
  const { info, getInfo } = useWebInfoContext();
  const { menus } = useMenuContext();
  const { user } = useAuthContext();
  const { cart } = useCartContext();
  const router = useRouter();

  useEffect(() => {
    function onScroll() {
      let header = document.querySelector(".top-header");
      let headerSearch = document.querySelector(".header-search");
      let pageDetailsHeader = document.querySelector(".pageDetailsHeader");
      let pageSide = document.querySelector(".page_sides");
      let productSide = document.querySelector(".product-side");
      if (header) {
        let sticky = header.offsetHeight;
        if (headerSearch) {
          sticky = headerSearch.offsetHeight;
        }
        if (pageDetailsHeader) {
          sticky = pageDetailsHeader.offsetHeight;
        }
        if (window.pageYOffset > sticky) {
          header.classList.add(`headerSticky`);
          if (pageSide) {
            pageSide.classList.add("side-margin-top");
          }
          if (productSide) {
            productSide.classList.add("side-margin-top");
          }
        } else {
          header.classList.remove(`headerSticky`);
          if (pageSide) {
            pageSide.classList.remove("side-margin-top");
          }
          if (productSide) {
            productSide.classList.remove("side-margin-top");
          }
        }
      }
    }
    getInfo();
    Aos.init();

    window.addEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="top-line"></div>
      <div className="top-header">
        <div className="container">
          <div className="header">
            <div className="header-left">
              <div className="header-logo">
                {info.logo && (
                  <a href="/">
                    <img
                      src={`${base.cdnUrl}/${info.whiteLogo}`}
                      className="whiteLogo"
                    />
                  </a>
                )}
              </div>
              <ul className="headerMenu">{menus}</ul>
            </div>
            <div className="header-right">
              <div className="auth-btns">
                {!user && (
                  <>
                    <Link href="/login" className="header-login-btn">
                      Нэвтрэх
                    </Link>
                    <Link href="/register" className="header-register-btn">
                      Бүртгүүлэх
                    </Link>
                  </>
                )}
                {user && (
                  <Link href="/userprofile" className="header-register-btn">
                    {user.firstName}
                  </Link>
                )}
              </div>

              <div className="header-cart" onClick={() => router.push("/cart")}>
                <img src="/images/shopping-cart.png" />
                <span>{cart.length}</span>
              </div>
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
