import React, { useEffect, useState } from "react";
import InputComponent from "../../Components/Input";
import ButtonComponent from "../../Components/Button";
import addBookService from "../../Lib/Services/AddBook";
import updateBookService from "../../Lib/Services/UpdateBook";
import getAllBooksService from "../../Lib/Services/GetAllBooks";

const AddEditBookComponent = ({ data, title, submitCallBack }) => {
  const [editedData, setEditedData] = useState({});
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    getBooksData();
  }, []);
  const getBooksData = async () => {
    try {
      const response = await getAllBooksService();
      setAllBooks(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(allBooks.length);
    let obj = {
      id: (allBooks.length + 1).toString(),
      title: "",
      author: "",
      rating: "",
      price: "",
      image: "images/book image.jpg",
      ratings: "",
      category: "",
      status: "",
      description: "",
    };
    if (data && title === "Edit") {
      obj = {
        id: data.id || "",
        title: data.title || "",
        author: data.author || "",
        rating: data.rating || "",
        price: data.price || "",
        image: data.image || "",
        ratings: data.ratings || "",
        category: "",
        status: "",
        description: "",
      };
    }
    setEditedData(obj);
  }, [data,allBooks]);
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
  const submitClick = async (e) => {
    e.preventDefault();
    try {
      const response =
        title === "Add"
          ? await addBookService(editedData)
          : await updateBookService(editedData, editedData.id);
      console.log(response);
      submitCallBack(`Book ${title}d Successfully`, "success");
    } catch (err) {
      console.log(err);
      submitCallBack(`Failed to ${title} book`, "error");
    }
  };
  return (
    <div>
      <form onSubmit={(e) => submitClick(e)}>
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
