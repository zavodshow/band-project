import { getCasesWithTags } from "@/api/caseAPI";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ExampleCase = () => {
  const [caseExampleInfo, setCaseExampleInfo] = useState([]);
  const navigate = useRouter();
  useEffect(() => {
    getCasesWithTags("3Д", 5)
      .then((data) => {
        if (data) {
          setCaseExampleInfo(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching cases:", error);
      });
  }, []);

  const MediaElement = ({ item }) => {
    if (!item) return null;
    
    const isVideo = item?.video?.endsWith('.mp4') || item?.video?.endsWith('.webm') || item?.video?.endsWith('.mov');
    const isImage = item?.video?.endsWith('.jpg') || item?.video?.endsWith('.jpeg') || item?.video?.endsWith('.png') || item?.video?.endsWith('.webp');

    return (
      <>
        {isVideo ? (
          <video
            src={item.video}
            onClick={() => navigate.push(`/case-one/${item?.id}`)}
          />
        ) : isImage ? (
          <img
            src={item.video}
            alt={item.name}
            onClick={() => navigate.push(`/case-one/${item?.id}`)}
          />
        ) : null}
      </>
    );
  };

  const SmallMediaCard = ({ item }) => (
    <div className="smallMediaCard">
      <MediaElement item={item} />
      <div>
        <p className="caseImgTitle">{item?.name}</p>
        <p className="caseImgText">{item?.venue}</p>
      </div>
    </div>
  );

  return (
    <section className="sectionWrapper section2">
      <div className="sectionHeader">
        <h2 className="sectionTitle" style={{ textAlign: "center" }}>
          Примеры кейсов с 3D-визуализацией
        </h2>
      </div>
      <div className="casesContainer">
        <div className="mainCase">
          <MediaElement item={caseExampleInfo[0]} />
          <div>
            <p className="caseImgTitle">{caseExampleInfo[0]?.name}</p>
            <p className="caseImgText">{caseExampleInfo[0]?.venue}</p>
          </div>
        </div>
        <div className="smallCasesGrid">
          {[1, 2, 3, 4].map((index) => (
            <SmallMediaCard key={index} item={caseExampleInfo[index]} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExampleCase;