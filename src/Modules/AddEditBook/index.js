import React, { useEffect, useState } from "react";
import InputComponent from "../../Components/Input";
import ButtonComponent from "../../Components/Button";
import TextAreaComponent from "../../Components/TextArea";
import addBookService from "../../Lib/Services/AddBook";
import updateBookService from "../../Lib/Services/UpdateBook";
import getAllBooksService from "../../Lib/Services/GetAllBooks";
import LoaderComponent from "../../Components/Loader";

const AddEditBookComponent = ({ data, title, submitCallBack }) => {
  const [editedData, setEditedData] = useState({});
  const [allBooks, setAllBooks] = useState([]);
  const [loader, setLoader] = useState(false);
  
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
        category: data.category || "",
        status: data.status || "",
        description: data.description || "",
      };
    }
    setEditedData(obj);
  }, [data, allBooks]);
  const renderInput = (label, type, name) => {
    return (
      <InputComponent
        placeholder={name}
        value={editedData[label]}
        onChange={(e) => inputChange(label, e)}
        type={type}
        required={true}
        label={name}
      ></InputComponent>
    );
  };
  const inputChange = (name, e) => {
    setEditedData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  const submitClick = async (e) => {
    e.preventDefault();
    setLoader(true);
    const obj = {
      ...editedData,
      id: (allBooks.length + 1).toString(),
    };
    try {
      const response =
        title === "Add"
          ? await addBookService(obj)
          : await updateBookService(editedData, editedData.id);
      console.log(response);
      setTimeout(() => {
        setLoader(false);
        submitCallBack(`Book ${title}d Successfully`, "success");
      }, 300);
    } catch (err) {
      console.log(err);
      setLoader(true);

      submitCallBack(`Failed to ${title} book`, "error");
    }
  };
  return (
    <div>
      <form onSubmit={(e) => submitClick(e)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {" "}
          <label>{title} Record</label>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              {" "}
              {renderInput("title", "text", "Title")}
              {renderInput("author", "text", "Author")}
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              {" "}
              {renderInput("rating", "text", "Rating")}
              {renderInput("price", "number", "Price")}
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              {" "}
              {renderInput("ratings", "number", "Ratings")}
              {renderInput("category", "text", "Category")}
            </div>
          </div>
          <TextAreaComponent
            placeholder="Description"
            value={editedData["description"]}
            onChange={(e) => inputChange("description", e)}
            type="text"
            label="Description"
          ></TextAreaComponent>
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
      {loader && <LoaderComponent></LoaderComponent>}
    </div>
  );
};
export default AddEditBookComponent;
