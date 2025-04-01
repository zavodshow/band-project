"use client";

import { useEffect, useState } from "react";
import DetailSection from "./DetailSection";
import { getCases } from "@/api/caseAPI";
import useScrollToTop from "@/hooks/useScrollToTop";
import { SearchInputBasic } from "@/components/Inputs";
import { useRouter } from "next/navigation";

const CaseCatalog = ({ type, catalogInfo }) => {
  useScrollToTop();

  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(cases);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase(); // Get search input value
    setSearchTerm(value); // Update the search term state

    const filtered = cases.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.cities.some((city) => city.toLowerCase().includes(value))
    );

    setFilteredData(filtered); // Update the filtered data
  };
  useEffect(() => {
    getCases().then((data) => {
      data && setCases(data);
      setFilteredData(data);
    });
  }, []);

  return (
    <section className="wrapper">
      <div className="container">
        <div className="sectionWrapper section2">
          <div className="sectionHeader">
            <div className="alignCenter" style={{ gap: "27px" }}>
              <h1
                className="x30"
                style={{ color: `var(--secondaryWhiteColor)` }}
              >
                Кейсы
              </h1>
              <h1 className="x30" style={{ color: `#B0B0B0` }}>
                {cases?.length}
              </h1>
            </div>
            <SearchInputBasic
              onChange={handleSearch}
              placeholder={catalogInfo.placeholder}
            />
          </div>
          <DetailSection
            type={type}
            data={filteredData}
            fieldInfo={catalogInfo.selectBoxInfo}
            checkText={catalogInfo.checkText}
          />
        </div>
      </div>
    </section>
  );
};

export default CaseCatalog;
