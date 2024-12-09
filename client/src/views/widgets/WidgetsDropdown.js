import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const WidgetsDropdown = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(`/vulnerability.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div
    style={{
      width: "100%", // Set a small width for the container
      height: "500px", // Set a small height for the container
      margin: "0px 10px 20px 10px", // Center the box and add some margin
      // border: "1px solid #ccc", 
      overflow: "hidden", // Ensure the map fits within the container
      borderRadius: "8px" // Optional: Rounded corners
    }}
  >
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 200// Adjusted scale to better fit within a smaller box
      }}
      style={{
        width: "100%",
        height: "100%" // Ensures the map fills the container completely
      }}
    >
      <Sphere stroke="#9E9E95" strokeWidth={0.5} />
      <Graticule stroke="#9E9E95" strokeWidth={0.5} />
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.ISO3 === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  </div>
  )
}

export default WidgetsDropdown