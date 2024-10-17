import React, { useEffect, useState } from "react";
import InputComponent from "../Input";
import searchBooksService from "../../Lib/Services/SearchBooks";

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
      filteredCallBack(data.slice(0, 10));
    }
    return () => clearTimeout(debounceHandler);
  }, [searchValue]);

  useEffect(() => {
    if (debounceParameter) {
      searchFunction(debounceParameter);
    }
  }, [debounceParameter]);

  const searchBooks = async (searchVal) => {
    try {
      const response = await searchBooksService(searchVal);
      if (response.status === 200) {
        filteredCallBack && filteredCallBack(response.data);
      } else {
        console.log("failed");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const searchFunction = (val) => {
    if (val) {
      searchBooks(val);
    } else {
      filteredCallBack && filteredCallBack(data.slice(0, 10));
    }
  };

  const inputChange = (val) => {
    setSearchvalue(val);
  };

  return (
    // <input
    //   onChange={(e) => inputChange(e.target.value)}
    //   placeholder="Search..."
    // ></input>
    <InputComponent
      onChange={(e) => inputChange(e.target.value)}
      placeholder="Search..."
    ></InputComponent>
  );
};

export default SearchComponent;
