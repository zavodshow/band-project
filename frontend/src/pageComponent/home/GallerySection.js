import { useState, useEffect, useRef } from "react";
import { gallery } from "../../constant/group";
import { ArrowDefaultButton } from "../../components/Buttons";
import { getCasesWithTags } from "../../api/caseAPI";
import { useRouter } from "next/navigation";

const GallerySection = ({ title, galleryType }) => {
  const [screenSize, setScreenSize] = useState(null);
  const [galleryInfo, setGalleryInfo] = useState(gallery);
  const navigate = useRouter();

  const galleryRef = useRef(null);

  useEffect(() => {
    getCasesWithTags(galleryType, 9)
      .then((data) => {
        const updatedGalleryInfo = data.map((item, index) => ({
          ...item,
          width: gallery[index]?.width || "",
          top: gallery[index]?.top || "",
        }));
        setGalleryInfo(updatedGalleryInfo);
      })
      .catch((error) => {
        console.error("Error fetching cases:", error);
      });
  }, [galleryType]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLink = (url) => {
    navigate.push(url);
  };

  const isVideo = (filename) =>
    filename?.endsWith(".mp4") ||
    filename?.endsWith(".webm") ||
    filename?.endsWith(".ogg");

  return (
    <div
      id="gallerySection"
      className="galleryWrapper sectionWrapper"
      ref={galleryRef}
    >
      <div className="section2">
        <h2
          className="sectionHeader sectionTitle"
          style={{
            textAlign: "center",
            position: "sticky",
            top: "clamp(100px, 15vw, 200px)",
            zIndex: 50
          }}
        >
          {title}
        </h2>
        <div className="gallery galleryMain">
          {galleryInfo.map((image, index) => (
            <div
              key={index}
              style={{
                width: `${screenSize > 768 ? image.width + "px" : "100%"}`,
                zIndex: 10
              }}
              className="rounded-lg"
            > 
              {isVideo(image.video) ? (
                <video
                  src={image.video}
                  alt={image.name}
                  style={{
                    marginTop: `${screenSize > 768 ? image.top : 0}px`,
                    width: `${screenSize > 768 ? image.width + "px" : "100%"}`,
                    height: "auto",
                    aspectRatio: "16 / 9",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    navigate.push(`/case-one/${image?.id}`);
                  }}
                />
              ) : (
                <img
                  src={image.video}
                  alt={image.name}
                  style={{
                    marginTop: `${screenSize > 768 ? image.top : 0}px`,
                    width: `${screenSize > 768 ? image.width + "px" : "100%"}`,
                    height: "auto",
                    aspectRatio: "16 / 9",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    navigate.push(`/case-one/${image?.id}`);
                  }}
                />
              )}

              <p className="x16">{image.name}</p>
              <p className="x12">{image.venue}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "10px" }}>
          <ArrowDefaultButton
            title="ВСЕ КЕЙСЫ ЗАВОД ШОУ"
            onClick={() => handleLink("/cases")}
          />
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
