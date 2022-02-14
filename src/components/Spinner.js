import React from "react";
import loading from "./loading1.gif";

const Spinner = () => {
  return (
    <div
      className="text-center"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <img className="my-3" src={loading} alt="loading" />
    </div>
  );
};

export default Spinner;
