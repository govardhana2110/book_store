import React, { useEffect, useState } from "react";

const SearchComponent = ({ data, filteredCallBack }) => {
  const [searchValue, setSearchvalue] = useState("");
  const [debounceParameter, setDebounceParameter] = useState("");

  useEffect(() => {
    let debounceHandler;
    if (searchValue) {
      debounceHandler = setTimeout(() => {
        setDebounceParameter(searchValue);
      }, 1000);
    } else {
      filteredCallBack(data);
    }
    return () => clearTimeout(debounceHandler);
  }, [searchValue]);

  useEffect(() => {
    if (debounceParameter) {
      searchFunction(debounceParameter);
    }
  }, [debounceParameter]);

  const searchFunction = (val) => {
    if (val) {
      const filteredData = data.filter((item) =>
        Object.keys(item).some((keys) =>
          String(item[keys]).toLowerCase().includes(val.toLowerCase())
        )
      );
      filteredCallBack && filteredCallBack(filteredData);
    } else {
      filteredCallBack && filteredCallBack(data);
    }
  };

  const inputChange = (val) => {
    setSearchvalue(val);
  };

  return (
    <input
      onChange={(e) => inputChange(e.target.value)}
      placeholder="Search..."
    ></input>
  );
};

export default SearchComponent;
