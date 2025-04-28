"use client";

import React from "react";

const MapComponent = () => {
  return (
    <div className="mapContainer" style={{ width: "100%", height: "685px" }}>
      <iframe
        title="2GIS Map"
        src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A55.76587907675046%2C%22lon%22%3A37.853178977966316%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22moscow%22%7D%2C%22org%22%3A%2270000001017220149%22%7D"
        width="100%"
        height="685"
        style={{ border: "1px solid #a3a3a3", boxSizing: "border-box" }}
        frameBorder="0"
        allowFullScreen
      />
      <noscript style={{ color: "#c00", fontSize: "16px", fontWeight: "bold" }}>
        Виджет карты использует JavaScript. Включите его в настройках вашего
        браузера.
      </noscript>
    </div>
  );
};

export default MapComponent;
