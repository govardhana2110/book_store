import React from "react";
import { GridLoader } from "react-spinners";
import "./loader.css";

const LoaderComponent = () => {
  return (
    <div className="loaderClass">
      <GridLoader></GridLoader>
    </div>
  );
};
export default LoaderComponent;
