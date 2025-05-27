import Image from "next/image";
import {
  dateIcon,
  flagIcon,
  lengthIcon,
  positionIcon,
  starIcon1,
  userIcon,
} from "@/assets";
import { CaseButton } from "@/components/Buttons";
import { TitleGoBack } from "@/components/Titles";

const TopCaseEventSection = ({ caseOne }) => {
  const day = caseOne?.startDate?.split(" ")[0];
  return (
    <section className="section1" style={{ paddingTop: "30px" }}>
      <div className="caseTopSection">
        <TitleGoBack title="← ВСЕ КЕЙСЫ" />
        <div className="flexWrapBetween caseTopWrapper">
          <div className="caseTitleWrapper">
            <h2 className="caseTitle">{caseOne?.name}</h2>
            <CaseButton title={caseOne?.blog_type || ""} />
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
                  src={caseOne?.blog_type === "Тур" ? positionIcon : flagIcon}
                />
                <p>
                  {caseOne.blog_type === "Тур"
                    ? caseOne?.cities?.length
                    : caseOne?.cities}
                </p>
              </div>
              <div
                className="x24Font_5 flex items-center"
                style={{ color: "var(--secondaryWhiteColor)" }}
              >
                <Image
                  style={{ marginRight: "clamp(6px, 2vw, 12px)" }}
                  alt="positionImg"
                  src={caseOne?.blog_type === "Тур" ? starIcon1 : positionIcon}
                />
                <p>{caseOne?.venue}</p>
              </div>
            </div>
            <div className="caseTopGap">
              <div
                className="x24Font_5 flex items-center"
                style={{ color: "var(--secondaryWhiteColor)" }}
              >
                <Image
                  style={{ marginRight: "clamp(6px, 2vw, 12px)" }}
                  alt="dateIcon"
                  src={dateIcon}
                />
                <p>
                  {caseOne?.startDate === caseOne?.endDate
                    ? caseOne?.endDate
                    : `${caseOne?.startDate} - ${caseOne?.endDate}`}
                </p>
              </div>
              <div
                className="x24Font_5 flex items-center"
                style={{ color: "var(--secondaryWhiteColor)" }}
              >
                <Image
                  style={{ marginRight: "clamp(6px, 2vw, 12px)" }}
                  alt="userIcon"
                  src={caseOne?.blog_type === "Тур" ? lengthIcon : userIcon}
                />
                <p>
                  {caseOne.blog_type === "Тур"
                    ? `${caseOne?.guests}`
                    : caseOne?.guests}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCaseEventSection;
