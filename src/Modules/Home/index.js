import React, { useEffect, useState } from "react";
import BookCardComponent from "../../Components/BookCard";
import HeaderComponent from "../../Components/Header";
import FooterComponent from "../../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../Store/CartItems";
import { useNavigate } from "react-router-dom";
import ModelPopupComponent from "../../Components/PopupModel";
import PaginationComponent from "../../Components/Pagination";
import ViewBookComponent from "../../Components/ViewBook";
import SearchComponent from "../../Components/Search";
import DropdownComponent from "../../Components/Dropdown";
import getAllBooksService from "../../Lib/Services/GetAllBooks";

const HomeComponent = () => {
  const categories = [
    { name: "Funny", value: "funny" },
    { name: "Crime", value: "crime" },
    { name: "Thriller", value: "thriller" },
    { name: "Horror", value: "horror" },
    { name: "History", value: "history" },
  ];
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({});
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.cartItems);
  const navigate = useNavigate();
  const [booksdata, setBooksData] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    getBooksData();
  }, []);
  const getBooksData = async () => {
    try {
      const response = await getAllBooksService();
      setBooksData(response.data);
      setAllBooks(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const addToCartClick = (ind) => {
    let dataArr = [...storeData.cartItems]; 
      const existingItemIndex = dataArr.findIndex(
      (item) => item.id === booksdata[ind].id
    );
    if (existingItemIndex !== -1) {
      let updatedItem = {
        ...dataArr[existingItemIndex],
        quantity: dataArr[existingItemIndex].quantity + 1,
      };
      dataArr[existingItemIndex] = updatedItem;
    } else {
      let newItem = {
        ...booksdata[ind],
        quantity: 1,
      };
      dataArr = [...dataArr, newItem];
    }
    dispatch(setCartItems(dataArr));
  };
  
  const buyNowClick = (id) => {
    dispatch(setCartItems(booksdata[id]));
    navigate("/checkOut");
  };
  const onCardClick = (id) => {
    setPopupData(booksdata[id]);
    setShowPopup(true);
  };
  const onCloseClick = () => {
    setShowPopup(false);
  };
  const filteredCallBack = (data) => {
    setBooksData([...data]);
  };
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div style={{ paddingTop: "4rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 8rem 0rem 8rem",
            flexWrap: "wrap",
            color: "black",
          }}
        >
          <SearchComponent
            data={allBooks}
            filteredCallBack={filteredCallBack}
          ></SearchComponent>
          <div style={{ width: "fit-content" }}>
            <DropdownComponent
              options={categories}
              placeHolder="Sort by..."
            ></DropdownComponent>
          </div>
        </div>
        <BookCardComponent
          data={booksdata}
          addToCartClick={addToCartClick}
          buyNowClick={buyNowClick}
          onCardClick={onCardClick}
        ></BookCardComponent>
      </div>
      <PaginationComponent data={booksdata} />

      {showPopup && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <ModelPopupComponent onCloseClick={() => onCloseClick()}>
            <ViewBookComponent book={popupData}></ViewBookComponent>
          </ModelPopupComponent>
        </div>
      )}
    </>
  );
};
export default HomeComponent;
