"use client";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const MobileFooter = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <div className="mobile-footer-container">
        <div className="mobileFooter">
          <div
            className={`mobile-footer-item ${pathname === "/" && "active"}`}
            onClick={() => router.push("/")}
          >
            <img src="/images/home.png" />
            Нүүр
          </div>
          <div
            className={`mobile-footer-item ${
              pathname === "/search" && "active"
            }`}
            onClick={() => router.push("/search")}
          >
            <img src="/images/search.png" />
            Хайх
          </div>
          <div
            className={`mobile-footer-item ${
              pathname === "/tires" && "active"
            }`}
            onClick={() => router.push("/tires")}
          >
            <img src="/images/tires.png" />
            Дугуй
          </div>

          <div
            className={`mobile-footer-item ${
              pathname === "/wheels" && "active"
            }`}
            onClick={() => router.push("/wheels")}
          >
            <img src="/images/rim.png" />
            Обуд
          </div>
          <div
            className={`mobile-footer-item ${
              pathname === "/userprofile" || (pathname === "/login" && "active")
            } `}
            onClick={() => router.push("/userprofile")}
          >
            <img src="/images/account.png" />
            Профайл
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
