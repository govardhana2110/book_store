import React, { useEffect, useState } from "react";
import "./pagination.css";
import DropdownComponent from "../Dropdown";
import ButtonComponent from "../Button";

const PaginationComponent = ({ data, paginationData }) => {
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const records = [
    { name: "10", value: "10" },
    { name: "20", value: "20" },
    { name: "30", value: "30" },
    { name: "40", value: "40" },
    { name: "50", value: "50" },
  ];
  useEffect(() => {
    const pages = data.length / recordsPerPage;
    setTotalPages(Math.ceil(pages));
    paginationData(data.slice(0, 10));
  }, [data]);
  const nextClick = () => {
    if (currentPage < totalPages) {
      paginationData(data.slice(currentPage * 10, currentPage * 10 + 10));
      setCurrentPage((prev) => prev + 1);
    }
  };
  const prevClick = () => {
    if (currentPage > 1) {
      if (currentPage === 2) {
        paginationData(data.slice(0, 10));
        setCurrentPage(1);
      } else {
        paginationData(data.slice((currentPage - 1) * 10, currentPage * 10));
        setCurrentPage((prev) => prev - 1);
      }
    }
  };
  return (
    <div className="mainDiv">
      {/* Records per page{" "}
      <DropdownComponent options={records} placeHolder=""></DropdownComponent> */}
      <ButtonComponent onClick={() => prevClick()} name="Prev">
        {" "}
      </ButtonComponent>
      <label style={{ color: "black", fontSize: "1rem", fontWeight: "600" }}>
        Page
        {currentPage} of {totalPages}{" "}
      </label>
      <ButtonComponent
        onClick={() => nextClick()}
        name="Next"
      ></ButtonComponent>
    </div>
  );
};
export default PaginationComponent;
