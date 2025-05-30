import { useState } from "react";
import TextPreview from "./Preview/TextPreview";
import Image from "next/image";
import { darkRead } from "@/assets";

const TextCard = (props) => {
  const [open, setOpen] = useState(false);

  const { name, avatar, content, file } = props;

  const handleMore = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="alignCenter" style={{ height: "350px" }}>
        <div className="videoCard">
          <div className="videoActionArea">
            <div className="circleVideoWrap"  style={{ cursor: "pointer" }}>
              <Image
                src={avatar}
                alt="avatar"
                className="circleVideo"
                width={100}
                height={100}
                onClick={handleMore}
                unoptimized={true}
              />
              <div className="videoPlayIcon itemCenter" onClick={handleMore}>
                <Image src={darkRead} alt="darkPlay" />
              </div>
            </div>
            <p className="cardBigTitle">{name}</p>
            {/* <button onClick={handleMore} className="cardDescription">
              Читать отзыв
            </button> */}
          </div>
        </div>
      </div>
      <TextPreview
        name={name}
        avatar={avatar}
        content={content}
        file={file}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default TextCard;
