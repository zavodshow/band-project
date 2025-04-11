import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { chicha123, chicha94 } from "../../assets";
import {
  BoxRound,
  MiddleChichaRound,
  MiddleRound,
  SmallChichaRound,
  SmallRound,
} from "../../components/BoxRound";
import {
  BlackButton,
  DefaultButton,
  SmallTabButton,
  SmallTransButton,
} from "../../components/Buttons";
import { TwoChichas } from "../../components/Chichas";
import { menuItemsData } from "../../constant/group";
import { Link } from "react-scroll";
import { heroVideo2 } from "../../assets";

const eventTypes = [
  "частных мероприятий",
  "корпоративных событий",
  "государственных событий",
  "конференций",
  "концертов",
  "туров",
];

const HeroSection = () => {
  const navigate = useRouter();
  const buttonGroupClassInfo = ["firstGroup", "secondGroup", "thirdGroup"];
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const currentEvent = eventTypes[currentEventIndex];
    
    if (!isDeleting) {
      // Typing phase
      if (displayText === currentEvent) {
        // Finished typing, pause then start deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(30);
        }, 1000);
      } else {
        // Continue typing
        timer = setTimeout(() => {
          setDisplayText(currentEvent.substring(0, displayText.length + 1));
        }, typingSpeed);
      }
    } else {
      // Deleting phase
      if (displayText === '') {
        // Finished deleting, move to next event
        setIsDeleting(false);
        setTypingSpeed(150);
        setCurrentEventIndex((prevIndex) => 
          prevIndex === eventTypes.length - 1 ? 0 : prevIndex + 1
        );
      } else {
        // Continue deleting
        timer = setTimeout(() => {
          setDisplayText(currentEvent.substring(0, displayText.length - 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentEventIndex, typingSpeed]);

  const handleLink = (url) => {
    navigate.push(url);
  };

  return (
    <div className="sectionWrapper" style={{ position: "relative" }}>
      <div className="heroSection">
        <div style={{ position: "absolute", width: "100%" }}>
          <div className="section1 heroContent">
            <div className="chichaShow">
              {menuItemsData[1].submenu.map((item, index) => (
                <div
                  key={index}
                  className={`alignCenter ${buttonGroupClassInfo[index]}`}
                  style={{ gap: "5px" }}
                >
                  <SmallTransButton title={item.title} />
                  {item.submenu.map((menu, idx) => (
                    <SmallTabButton
                      onClick={() => handleLink(menu.url)}
                      key={idx}
                      title={menu.title}
                    />
                  ))}
                </div>
              ))}
            </div>
            <h1 className="pageTitle pageTitle-1" style={{ textAlign: "left" }}>
              Технический продакшн
            </h1>
            <h1 className="pageTitle pageTitle-2" style={{ textAlign: "right", height: "80px" }}>
              {displayText}
              <span className="cursor">|</span>
            </h1>
            <div className="itemCenter">
              <div
                className="chichaHidden"
                style={{ gap: "4px", marginTop: "16px" }}
              >
                {menuItemsData[1].submenu.map((item, index) => (
                  <SmallTransButton
                    key={index}
                    title={index === 0 ? "ТЕХ. УСЛУГИ" : item.title}
                  />
                ))}
              </div>
            </div>
            <div className="flexWrap itemCenter heroBottomButton">
              <Link to="gallerySection" spy={true} smooth={true}>
                <DefaultButton title="КЕЙСЫ" />
              </Link>
              <BlackButton
                title="зАПОЛНИТЬ БРИФ"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/documents/Бриф по проекту.xlsx";
                  link.download = "Бриф по проекту";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              />
            </div>
          </div>
        </div>
        <video
          src={heroVideo2}
          autoPlay
          muted
          loop
          className="heroVideo"
        ></video>
      </div>
      <div>
        <div className="chichaHidden">
          <SmallChichaRound right={-1} bottom={-1} rotate={"90deg"} />
          <SmallChichaRound left={-1} bottom={-1} rotate={"180deg"} />
          <SmallRound right={-1} top={-1} />
          <SmallRound left={-1} top={-1} rotate={"-90deg"} />
        </div>

        <div className="chichaShow">
          <MiddleRound right={-1} top={-1} />
          <MiddleRound left={-1} top={-1} rotate="-90deg" />
          <MiddleChichaRound
            flag={true}
            right={-1}
            bottom={-5}
            rotate="90deg"
          />
          <div className="chichaIndex heroTwoChichas">
            <TwoChichas img1={chicha94} img2={chicha123} />
            <BoxRound left="0px" top="-49px" width="50px" />
            <BoxRound right="-47px" bottom="43px" width="50px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;