import React, { useState } from "react";
import TableComponent from "../../Components/Table";
import HeaderComponent from "../../Components/Header";
import ModelPopupComponent from "../../Components/PopupModel";
import AddEditBookComponent from "../AddEditBook";
import ConfirmationComponent from "../../Components/Confirmation";

const ManageInventryComponent = () => {
  const booksData = [
    {
      title: "Book 1",
      rating: "4.3",
      price: "502",
      author: "Me and someone jhskdgf sdfhgsdf sdkjfhsdkjf ksjdhf sdfkj kjh",
      image: "images/book image.jpg",
      ratings: "400",
    },
    {
      title: "Book 3",
      rating: "4.2",
      price: "505",
      author: "som eone",
      image: "images/book image.jpg",
      ratings: "408",
    },
    {
      title: "Book jhadf",
      rating: "4.6",
      price: "50876",
      author: "Me and also",
      image: "images/book image.jpg",
      ratings: "490",
    },
    {
      title: "Book 8",
      rating: "4.9",
      price: "5087687",
      author: "every one",
      image: "images/book image.jpg",
      ratings: "404",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
      ratings: "460",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
      ratings: "430",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
      ratings: "4090",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
      ratings: "40390",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
      ratings: "480",
    },
  ];
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState();
  const [editId, setEditId] = useState();
  const [addEditFlag, setAddEditFalg] = useState("Add");
  const onAddClick = () => {
    setShowPopup(true);
    setAddEditFalg("Add");
  };
  const editClick = (id) => {
    setEditId(id);
    setShowPopup(true);
    setAddEditFalg("Edit");
  };
  const deleteClick = (id) => {
    setDeleteConfirmation(true);
    setDeleteIndex(id);
  };
  const onCloseClick = () => {
    setShowPopup(false);
  };
  const onYesClick = (id) => {};
  const onNoClick = () => {
    setDeleteConfirmation(false);
  };
  const onCloseConfirmClick = () => {
    setDeleteConfirmation(false);
  };
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          color: "black",
          paddingTop: "4rem",
          width: "90%",
        }}
      >
        {" "}
        <span>Manage Inventry</span>
        <button onClick={() => onAddClick()}>Add Book</button>
      </div>
      <div style={{ width: "90%" }}>
        {" "}
        <TableComponent
          data={booksData}
          editClick={editClick}
          deleteClick={deleteClick}
        ></TableComponent>
      </div>
      {showPopup && (
        <ModelPopupComponent onCloseClick={onCloseClick}>
          <AddEditBookComponent
            data={booksData[editId]}
            title={addEditFlag}
          ></AddEditBookComponent>
        </ModelPopupComponent>
      )}
      {deleteConfirmation && (
        <ConfirmationComponent
          title="Are you sure? you want to delete this record..?"
          id={deleteIndex}
          onCloseConfirmClick={() => onCloseConfirmClick()}
          onYesClick={onYesClick}
          onNoClick={onNoClick}
        ></ConfirmationComponent>
      )}
    </>
  );
};
export default ManageInventryComponent;
