import React, { useEffect, useState } from "react";
import TableComponent from "../../Components/Table";
import HeaderComponent from "../../Components/Header";
import ModelPopupComponent from "../../Components/PopupModel";
import AddEditBookComponent from "../AddEditBook";
import ConfirmationComponent from "../../Components/Confirmation";
import getAllBooksService from "../../Lib/Services/GetAllBooks";

const ManageInventryComponent = () => {
  const [booksData, setBooksData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState();
  const [editId, setEditId] = useState();
  const [addEditFlag, setAddEditFalg] = useState("Add");

  useEffect(() => {
    getBooksData();
  }, []);
  const getBooksData = async () => {
    try {
      const response = await getAllBooksService();
      setBooksData(response.data);
      console.log(response.data)
    } catch (err) {
      console.log(err);
    }
  };
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
