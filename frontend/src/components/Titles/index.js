import Image from "next/image";

const TitleGoBack = ({ title }) => (
  <p
    className="x12"
    style={{
      fontWeight: "700",
      color: "var(--secondaryWhiteColor)",
      cursor: "pointer",
    }}
    onClick={() => {
      window.history.back();
    }}
  >
    {title}
  </p>
);

const PDFText = ({ text = "PDF 2.1 Мб" }) => <p className="pdfText">{text}</p>;

const Title16 = ({ title }) => (
  <p className="x16" style={{ marginBottom: "12px" }}>
    {title}
  </p>
);

const TitleAdminUserEdit = ({ onClick, img, title, color }) => (
  <div className="alignCenter" onClick={onClick}>
    <Image src={img} alt={img} style={{ marginRight: "10px" }} />
    {title && (
      <p className="x15_1" style={{ color: color || "#969696" }}>
        {title}
      </p>
    )}
  </div>
);

export { TitleGoBack, PDFText, Title16, TitleAdminUserEdit };
