"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BigCaseVideoBox } from "@/components/Boxes";
import ContactSection from "@/pageComponent/home/ContactSection";
import EquipmentUsed from "./EquipmentUsed";
import TopSiteEventSection from "./TopSiteEventSection";
import UserBtnList from "./UserBtnList";
import { getSiteById } from "@/api/siteAPI";
import useScrollToTop from "@/hooks/useScrollToTop";
// import "@styles/pages/sitepage.css";

const SitePage = () => {
  useScrollToTop();
  const { siteId } = useParams();
  const [siteOne, setSiteOne] = useState({});
  useEffect(() => {
    getSiteById(siteId).then((data) => {
      data && setSiteOne(data);
    });
  }, [siteId]);
  
  return (
    <section className="wrapper">
      <div className="container">
        <TopSiteEventSection siteOne={siteOne} />
        <BigCaseVideoBox src={`${siteOne?.video}`} />
        <UserBtnList siteTags={siteOne?.siteTags}/>
        <EquipmentUsed
          title="На этой площадке проводились"
          cases={siteOne?.blogs}
        />
        <ContactSection title="Рассчитать cобытие на этой площадке" />
      </div>
    </section>
  );
};

export default SitePage;
