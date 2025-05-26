"use client";

import React, { useState, useEffect, useRef } from "react";
import { logo, search, darkVK, darkTelegram, hambuger } from "@/assets";
import { CircleButton, DefaultButton, RectButton } from "@/components/Buttons";
import HeaderLink from "./HeaderLink/HeaderLink";
import MobileHeaderLink from "./HeaderLink/MobileHeaderLink";
import HeaderWrapper from "./HeaderWrapp";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { ToPhone } from "../components/ToText";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const [isHamburger, setisHamburger] = useState(false);
  const isMobile = useMediaQuery("(max-width: 850px)");
  const [searchTerm, setSearchTerm] = useState("");
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    setisHamburger(!isHamburger);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const BottomHeader = () => (
    <div className="spaceBetween">
      {!isMobile && (
        <>
          <HeaderLink />
          <RectButton
            onClick={() => router.push("/development")}
            title="Наш мерч →"
          />
        </>
      )}
    </div>
  );

  const goContactus = () => {
    let section = document.getElementById("contactSection");
    if (!section) {
      router.push("/contact");
      setTimeout(() => {
        section = document.getElementById("contactSection");
        if (section) {
          const sectionY =
            section.getBoundingClientRect().top + window.pageYOffset - 200;
          window.scrollTo({ top: sectionY, behavior: "smooth" });
        }
      }, 500);
    } else {
      const sectionY =
        section.getBoundingClientRect().top + window.pageYOffset - 200;
      window.scrollTo({ top: sectionY, behavior: "smooth" });
    }
  };

  return (
    <HeaderWrapper
      content={
        <>
          <div
            className={`spaceBetween topHeader ${isShrunk ? "scrolled" : ""}`}
          >
            <Link href="/">
              <Image src={logo} alt="logo" className="logo" />
            </Link>
            <form onSubmit={handleSearch} className="headerInput">
              <div className="alignCenter">
                <button type="submit">
                  <Image src={search} alt="search" className="searchIcon" />
                </button>
                <input
                  placeholder="ПОИСК"
                  onKeyDown={handleKeyDown}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-red-900"
                />
              </div>
            </form>
            <ToPhone className="phoneNumber" phoneNumber="+7 (495) 720-12-82" />
            <div className="circleBtnWrapper">
              <a href="https://t.me/zavodshow" rel="noreferrer" target="_blank">
                <CircleButton scale="0.698" icon={darkTelegram} />
              </a>
              <a
                href="https://vk.com/zavodshow"
                rel="noreferrer"
                target="_blank"
              >
                <CircleButton scale="0.698" icon={darkVK} />
              </a>
            </div>
            <div className="requestBtn">
              <DefaultButton
                onClick={() => goContactus()}
                title="ОСТАВИТЬ ЗАЯВКУ"
              />
            </div>
            <Image
              className="hambugerImg"
              src={hambuger}
              onClick={handleClick}
              alt="hambuger"
            />
          </div>
          <hr />
          <BottomHeader />
          {!isMobile && isShrunk && <hr />}
          {isHamburger && isMobile && <MobileHeaderLink />}
        </>
      }
    />
  );
};

export default Header;
