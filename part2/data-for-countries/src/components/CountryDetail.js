import React from "react";

const CountryDetail = ({ rows, details }) => {
  console.log("CountryDetail", details());
  if (rows().length === 1) {
    return <div>{details()}</div>;
  }
  return <></>;
};

export default CountryDetail;
