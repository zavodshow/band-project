import { bigChicha } from "@/assets";
import CanvasComponent from "@/components/canvas";
import { QuestionButton } from "@/components/Buttons";
import { questionSqareInfo } from "@/constant/group";
import Image from "next/image";

const ShowConcept = () => (
  <div className="sectionWrapper section2" style={{ textAlign: "center" }}>
    <div className="sectionHeader">
      <h2 className="sectionTitle">Как мы начинаем работу над шоу </h2>
    </div>
    <div className="lampChichaSquare">
      <div className="chichaGroup1">
        <p className="showConceptQuestions">{questionSqareInfo[0].title}</p>
        <div className="questionButtonGroup">
          {questionSqareInfo[0].button.map((title, index) => (
            <div key={index} className={`${index === 1 && "itemCenter"}`}>
              <QuestionButton title={title} />
            </div>
          ))}
        </div>
      </div>

      <div className="chichaGroup">
        <div className="chichaWrapper"></div>
        <Image
          src={bigChicha}
          alt="bigchicha"
          style={{
            position: "relative",
            zIndex: "50",
            width: "320px",
            height: "320px",
          }}
        />
        <p className="showConceptsm">Концепция шоу</p>
        <p className="showConceptBasis">Основа для его разработки</p>
        <div className="canvasLine">
          <CanvasComponent />
        </div>
      </div>

      <div className="chichaGroup1">
        <p className="showConceptQuestions">{questionSqareInfo[1].title}</p>
        <div className="questionButtonGroup">
          {questionSqareInfo[1].button.map((title, index) => (
            <div
              key={index}
              className={`${index === 1 ? "itemCenter" : "itemEnd"}`}
            >
              <QuestionButton title={title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ShowConcept;
