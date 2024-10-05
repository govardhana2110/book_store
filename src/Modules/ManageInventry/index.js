import React, { useEffect, useState } from "react";
import TableComponent from "../../Components/Table";
import HeaderComponent from "../../Components/Header";
import ModelPopupComponent from "../../Components/PopupModel";
import AddEditBookComponent from "../AddEditBook";
import ConfirmationComponent from "../../Components/Confirmation";
import getAllBooksService from "../../Lib/Services/GetAllBooks";
import deleteBookService from "../../Lib/Services/DeleteBook";
import NotifyComponent from "../../Components/Notify";
import LoaderComponent from "../../Components/Loader";

const ManageInventoryComponent = () => {
  const [booksData, setBooksData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState();
  const [editRecord, setEditRecord] = useState();
  const [addEditFlag, setAddEditFlag] = useState("Add");
  const [notify, setNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notifyType, setNotifyType] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getBooksData();
  }, [showPopup]);

  const getBooksData = async () => {
    try {
      const response = await getAllBooksService();
      setBooksData(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onAddClick = () => {
    setShowPopup(true);
    setAddEditFlag("Add");
  };

  const editClick = (id) => {
    setEditRecord(booksData[id]);
    setShowPopup(true);
    setAddEditFlag("Edit");
  };

  const deleteClick = (id) => {
    setDeleteConfirmation(true);
    setDeleteIndex(id);
  };

  const onCloseClick = () => {
    setShowPopup(false);
  };

  const deleteBook = async (id) => {
    setLoader(true);
    try {
      const response = await deleteBookService(id);
      console.log(response);
      setTimeout(() => {
        setLoader(false);
        setShowPopup(false);
        setDeleteConfirmation(false);
        setNotifyType("success");
        setNotifyMessage("Book Deleted Successfully");
        setNotify(true);
      }, 300);
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        setLoader(false);
        setShowPopup(false);
        setDeleteConfirmation(false);
        setNotifyType("error");
        setNotifyMessage("Failed To Delete Book");
        setNotify(true);
      }, 300);
    }
  };

  const onYesClick = (id) => {
    deleteBook(id);
  };

  const onNoClick = () => {
    setDeleteConfirmation(false);
  };

  const onCloseConfirmClick = () => {
    setDeleteConfirmation(false);
  };

  const submitCallBack = (message, type) => {
    if (type === "success") {
      setShowPopup(false);
      setNotifyType("success");
      setNotifyMessage(message);
      setNotify(true);
    } else {
      setNotifyType("error");
      setNotifyMessage(message);
      setNotify(true);
    }
  };

  return (
    <>
      <HeaderComponent />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "black",
          paddingTop: "4rem",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
            marginBottom: "1rem",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Manage Inventory</span>
          <button onClick={onAddClick} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
            Add Book
          </button>
        </div>
        <div style={{ width: "80%" }}>
          <TableComponent
            data={booksData}
            editClick={editClick}
            deleteClick={deleteClick}
          />
        </div>
      </div>
      {showPopup && (
        <ModelPopupComponent onCloseClick={onCloseClick}>
          <AddEditBookComponent
            data={editRecord}
            title={addEditFlag}
            submitCallBack={submitCallBack}
          />
        </ModelPopupComponent>
      )}
      {deleteConfirmation && (
        <ConfirmationComponent
          title="Are you sure? You want to delete this record..?"
          id={deleteIndex}
          onCloseConfirmClick={onCloseConfirmClick}
          onYesClick={onYesClick}
          onNoClick={onNoClick}
        />
      )}
      {notify && (
        <NotifyComponent
          message={notifyMessage}
          type={notifyType}
          show={notify}
        />
      )}
      {loader && <LoaderComponent />}
    </>
  );
};

export default ManageInventoryComponent;
