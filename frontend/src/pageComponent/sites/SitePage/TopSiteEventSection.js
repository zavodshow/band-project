import Image from "next/image";
import { positionIcon, userIcon, worldIcon } from "@/assets";
import { CaseButton } from "@/components/Buttons";
import { TitleGoBack } from "@/components/Titles";
import { Margin } from "@mui/icons-material";

const TopSiteEventSection = ({ siteOne }) => {
  return (
    <section className="section1">
      <div className="caseTopSection">
        <TitleGoBack title="← ВСЕ ПЛОЩАДКИ" />
        <div className="flexWrap caseTopWrapper items-start">
          <div className="caseTitleWrapper">
            <h2 className="caseTitle">{siteOne?.name}</h2>{" "}
            <div className="flexWrap" style={{ gap: "5px" }}>
              {siteOne?.site_type?.map((site, index) => (
                <CaseButton key={index} title={site} />
              ))}
            </div>
          </div>
          <div className="caseTopItem spaceBetween">
            <div className="caseTopGap">
              <div
                className="x24Font_5 flex items-center"
                style={{ color: "var(--secondaryWhiteColor)" }}
              >
                <Image
                  style={{ marginRight: "clamp(6px, 2vw, 12px)" }}
                  alt="flagImg"
                  src={positionIcon}
                />
                <p>
                  <span className="font-bold">{siteOne?.cities}, </span>
                  {siteOne?.address}
                </p>
              </div>
              <div className="spaceBetween">
                <div
                  className="x24Font_5 flex items-center"
                  style={{
                    color: "var(--secondaryWhiteColor)",
                    marginRight: "24px",
                  }}
                >
                  <Image
                    style={{ marginRight: "clamp(6px, 2vw, 12px)" }}
                    alt="flagImg"
                    src={worldIcon}
                  />
                  <p>{siteOne?.link_page}</p>
                </div>
                <div
                  className="x24Font_5 flex items-center"
                  style={{ color: "var(--secondaryWhiteColor)" }}
                >
                  <Image
                    style={{ marginRight: "clamp(6px, 2vw, 12px)" }}
                    alt="flagImg"
                    src={userIcon}
                  />
                  <p>{siteOne?.capacity} гостей</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSiteEventSection;
