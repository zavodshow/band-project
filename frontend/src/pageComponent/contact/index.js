"use client";
import * as React from "react";
import useScrollToTop from "../../hooks/useScrollToTop";
import ContactSection from "@/pageComponent/home/ContactSection";
import LoadingChicha from "@/components/LoadingChicha/LoadingChicha";
import MemberSection from "./MemberSection";
import MapComponent from "./MapComponent";

const TeamOffice = () => {
  useScrollToTop();

  return (
    <div className="wrapper">
      <div className="container">
        <div className="sectionWrapper">
          <div className="mapWrapper">
            <MemberSection />
            <MapComponent />
          </div>
        </div>
        <div className="sectionWrapper">
          <ContactSection title="Остались вопросы?" />
        </div>
      </div>
    </div>
  );
};

export default TeamOffice;
