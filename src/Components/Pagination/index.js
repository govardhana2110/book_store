import React, { useEffect, useState } from "react";
import "./pagination.css";
import DropdownComponent from "../Dropdown";

const PaginationComponent = ({ data }) => {
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const records = [
    { name: "10", value: "10" },
    { name: "20", value: "20" },
    { name: "30", value: "30" },
    { name: "40", value: "40" },
    { name: "50", value: "50" },
  ];
  useEffect(() => {
    const pages = data.length / recordsPerPage;
    setTotalPages(pages);
  }, []);
  return (
    <div className="mainDiv">
      Records per page <DropdownComponent options={records}></DropdownComponent>
      {Array.from({length:totalPages.length}).map}
    </div>
  );
};
export default PaginationComponent;
