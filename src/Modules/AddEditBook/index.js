import React, { useEffect, useState } from "react";
import InputComponent from "../../Components/Input";
import ButtonComponent from "../../Components/Button";
import TextAreaComponent from "../../Components/TextArea";
import addBookService from "../../Lib/Services/AddBook";
import updateBookService from "../../Lib/Services/UpdateBook";
import getAllBooksService from "../../Lib/Services/GetAllBooks";
import LoaderComponent from "../../Components/Loader";

const AddEditBookComponent = ({ data, title, submitCallBack }) => {
  const [editedData, setEditedData] = useState({
    bookName: "",
    authorName: "",
    rating: "",
    price: "",
    totalRatings: "",
    category: "",
    status: "Available",
    description: "",
    image: "",
    availableQuantity: "",
  });
  const [allBooks, setAllBooks] = useState([]);
  const [loader, setLoader] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

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
    // Set edited data only if the title is "Edit" and data is present
    if (data && title === "Edit") {
      setEditedData({
        bookName: data.bookName || "",
        authorName: data.authorName || "",
        rating: data.rating || "",
        price: data.price || "",
        totalRatings: data.totalRatings || "",
        category: data.category || "",
        status: data.status || "Available",
        description: data.description || "",
        image: data.imageUrl || "", // This is for preview only, won't be used for file input
        availableQuantity: data.availableQuantity || "",
      });
      setImagePreview(
        `${process.env.REACT_APP_JSON_URL}/${data.imageUrl.replace(
          "src\\main\\resources\\static\\",
          ""
        )}`
      ); // Set image preview from the URL
    }
  }, [data, title]); // Only re-run when data or title changes

  const renderInput = (label, type, name) => {
    return (
      <InputComponent
        placeholder={name}
        value={editedData[label] || ""} // Use a fallback to avoid undefined
        onChange={(e) => inputChange(label, e)}
        type={type}
        required={true}
        label={name}
      />
    );
  };

  const inputChange = (name, e) => {
    setEditedData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const imageChange = (e) => {
    if (e.target.files.length > 0) {
      setEditedData((prev) => ({ ...prev, image: e.target.files[0] }));
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const submitClick = async (e) => {
    e.preventDefault();
    setLoader(true);
    console.log(editedData);
    const multiPartData = new FormData();
    for (const key in editedData) {
      multiPartData.append(key, editedData[key]);
    }
    // for (const [key, value] of data.entries()) {
    //   console.log(`${key}:`, value);
    // }
    try {
      const response =
        title === "Add"
          ? await addBookService(multiPartData)
          : await updateBookService(multiPartData, data.id);
      console.log(response);
      submitCallBack(`Book ${title}d Successfully`, "success");
    } catch (err) {
      console.log(err);
      submitCallBack(`Failed to ${title} book`, "error");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <form onSubmit={submitClick}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label>{title} Record</label>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              {renderInput("bookName", "text", "Book Name")}
              {renderInput("authorName", "text", "Author")}
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              {renderInput("rating", "number", "Rating")}
              {renderInput("price", "number", "Price")}
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              {renderInput("totalRatings", "number", "Total Ratings")}
              {renderInput("category", "text", "Category")}
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              {renderInput("availableQuantity", "number", "Available Quantity")}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <InputComponent
                  placeholder="Image"
                  type="file"
                  onChange={imageChange}
                  label="Image"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      height: "10rem",
                      width: "10rem",
                      marginTop: "1rem",
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <TextAreaComponent
            placeholder="Description"
            value={editedData["description"] || ""} // Use fallback to avoid undefined
            onChange={(e) => inputChange("description", e)}
            label="Description"
          />
        </div>
        <ButtonComponent
          name={title === "Add" ? "Add Book" : "Update Book"}
          type="submit"
        />
      </form>
      {loader && <LoaderComponent />}
    </div>
  );
};

export default AddEditBookComponent;
