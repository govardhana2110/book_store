import React, { useEffect, useState } from "react";
import InputComponent from "../../Components/Input";
import ButtonComponent from "../../Components/Button";
import addBookService from "../../Lib/Services/AddBook";
import updateBookService from "../../Lib/Services/UpdateBook";

const AddEditBookComponent = ({ data, title }) => {
  const [editedData, setEditedData] = useState({});
  useEffect(() => {
    let obj = {
      title: "",
      author: "",
      price: "",
      rating: "",
      image: "",
      ratings: "",
      category: "",
      status: "",
      description: "",
      id: "4",
    };
    if (data && title === "Edit") {
      obj = {
        title: data.title || "",
        author: data.author || "",
        price: data.price || "",
        rating: data.rating || "",
        image: data.image || "",
        ratings: data.ratings || "",
        category: "",
        status: "",
        description: "",
        id: data.id || "",
      };
    }
    setEditedData(obj);
  }, [data]);
  const renderInput = (label, name) => {
    return (
      <InputComponent
        placeholder={label}
        value={editedData[label]}
        onChange={(e) => inputChange(label, e)}
        type={(name && name) || "text"}
      ></InputComponent>
    );
  };
  const inputChange = (name, e) => {
    setEditedData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  const submitClick = async () => {
    try {
      const response =
        title === "Add"
          ? await addBookService(editedData)
          : await updateBookService(editedData, editedData.id);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={() => submitClick()}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {" "}
          <label>{title} Record</label>
          {renderInput("title")}
          {renderInput("author")}
          {renderInput("price")}
          {renderInput("rating")}
          {/* {renderInput("image")} */}
          {renderInput("ratings")}
          {/* {renderInput("image", "file")} */}
        </div>
        {/* <button type="submit">
          {title === "Add" ? "Add Book" : "Update Book"}
        </button> */}
        <ButtonComponent
          name={title === "Add" ? "Add Book" : "Update Book"}
          type="submit"
        ></ButtonComponent>
      </form>
    </div>
  );
};
export default AddEditBookComponent;
