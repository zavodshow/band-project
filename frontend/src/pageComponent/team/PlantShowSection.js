import { plantShowMobileInfo } from "../../constant/group";

const PlantShowSection = () => {
  // Split the info into chunks of 2 for layout (2 per column block)
  const chunkedInfo = [];
  for (let i = 0; i < plantShowMobileInfo.length; i += 2) {
    chunkedInfo.push(plantShowMobileInfo.slice(i, i + 2));
  }

  return (
    <div className="sectionWrapper">
      <div className="section2">
        <div className="sectionHeader">
          <h2 className="pageTitle text-center">ЗАВОД ШОУ — это ценности</h2>
        </div>

        <div className="plantShowTopics flexWrapAround">
          {chunkedInfo.map((pair, index) => (
            <div key={index} className="plantTopicsColumn">
              {pair.map((item, i) => (
                <div key={i} className="plantTopicsItem">
                  <p className="x24Font_1">{item.topic}</p>
                  <p className="x18Font_4">{item.content}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlantShowSection;
