"use client";

import { Svideo5, Svideo02 } from "@/assets";
import { BigVideoBox } from "@/components/Boxes";
import HeroSample from "@/components/HeroSample/HeroSample";
import SwiperSection from "@/components/Swiper/Swiper";
import { equipmentsCardInfo, heroSectionInfo } from "@/constant/group";
import useScrollToTop from "@/hooks/useScrollToTop";
import BlogSection from "@/pageComponent/home/BlogSection";
import ContactSection from "@/pageComponent/home/ContactSection";
import GallerySection from "@/pageComponent/home/GallerySection";
import EquipmentCard from "../light/EquipmentCard";
// import EquipmentCategorySection from "../Light/EquipmentCategorySection";

const SoundPage = () => {
  useScrollToTop();

  return (
    <section className="wrapper technical">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[6]} />
        <GallerySection title="Наши кейсы по звуку" galleryType="Звук" />
        <EquipmentCard data={equipmentsCardInfo.sound} title="Звук" />
        <BigVideoBox
          item={{
            src: Svideo02,
            videoTitle: "Звуковая волна",
            videoDescription: "Рейв-фестиваль",
          }}
        />
        {/* <EquipmentCategorySection type="звук" /> */}
      </div>
      <SwiperSection displayType="Технические услуги" />
      <div className="container">
        <ContactSection title="Рассчитать звук" />
        <BlogSection />
      </div>
    </section>
  );
};

export default SoundPage;
