import { useRouter } from "next/navigation";
import { chicha72, chicha94, design } from "../../assets";
import { BigTransButton, DefaultButton } from "../../components/Buttons";
import { TwoChichas } from "../../components/Chichas";
import { Link } from "react-scroll";

const AboutSection = () => {
  const navigate = useRouter();

  const handleLink = (url) => {
    navigate.push(url);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${design.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="aboutSection section1">
        <div
          className="itemCenter sectionHeader"
          style={{ position: "relative", gap: "30px", textAlign: "center" }}
        >
          <div
            style={{
              position: "absolute",
              left: "clamp(0px, 4vw, 50px)",
              bottom: -10,
            }}
          >
            <TwoChichas img1={chicha72} img2={chicha94} rotate="-15deg" />
          </div>
          <h2 className="sectionTitle">Спроектируем и настроим</h2>
          <div
            style={{
              position: "absolute",
              right: "clamp(0px, 4vw, 50px)",
              bottom: 10,
            }}
          >
            <TwoChichas img1={chicha94} img2={chicha72} rotate="-30deg" />
          </div>
        </div>
        <div
          className="flexWrap itemCenter"
          style={{ gap: "6px", fontSize: "35px" }}
        >
          <BigTransButton
            title="ОДЕЖДУ СЦЕНЫ И ЛИНОЛЕУМ"
            long={true}
            onClick={() => handleLink("/technical/stageclothes")}
          />
          <div className="flexWrap" style={{ gap: "6px" }}>
            <BigTransButton
              title="CВЕТ"
              onClick={() => handleLink("/technical/light")}
            />
            <BigTransButton
              title="ЗВУК"
              onClick={() => handleLink("/technical/sound")}
            />
            <BigTransButton
              title="ВИДЕО"
              onClick={() => handleLink("/technical/videopage")}
            />
          </div>
        </div>
        <div
          className="itemCenter"
          style={{ marginTop: "clamp(40px, 5vw, 64px)" }}
        >
          <Link to="contactSection" offset={-200} spy={true} smooth={true}>
            <DefaultButton title="заказать обратный звонок" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
