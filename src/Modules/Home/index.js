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
import getCartItemsService from "../../Lib/Services/GetCartItems";
import addCartItemsService from "../../Lib/Services/AddCartItems";
import getBooksByCategoryService from "../../Lib/Services/GetBooksByCategory";
import updateCartItemService from "../../Lib/Services/UpdateCartItems";

const HomeComponent = () => {
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({});
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.cartItems);
  const navigate = useNavigate();
  const [booksdata, setBooksData] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    getBooksData();
  }, []);

  const getBooksData = async () => {
    try {
      const response = await getAllBooksService();

      if (response.status === 200) {
        setAllBooks(response.data);

        const uniqueCategories = new Set();
        response.data.map((item) => {
          uniqueCategories.add(item.category);
          return { name: item.category, value: item.category };
        });

        // Convert the Set to an array and filter for unique categories
        const uniqueCategoriesArray = Array.from(uniqueCategories).map(
          (category) => ({
            name: category,
            value: category,
          })
        );

        setCategories([
          { name: "All", value: "All" },
          ...uniqueCategoriesArray,
        ]);
      }
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
      updateCartItems(updatedItem.quantity, updatedItem.id);
    } else {
      let newItem = {
        ...booksdata[ind],
        quantity: 1,
      };
      dataArr = [...dataArr, newItem];
      cartItemsChange({ ...newItem, orderStatus: "Pending" });
    }
    dispatch(setCartItems(dataArr));
  };
  const cartItemsChange = async (data) => {
    try {
      const response = await addCartItemsService(data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const updateCartItems = async (data, id) => {
    try {
      const response = await updateCartItemService(data, id);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
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
  const onSortChange = (e) => {
    setSortBy(e.target.value);
  };
  const sortFunction = async () => {
    if (sortBy !== "All") {
      try {
        const response = await getBooksByCategoryService(sortBy);
        if (response.status === 200) {
          setAllBooks(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      getBooksData();
    }
  };
  useEffect(() => {
    sortFunction();
  }, [sortBy]);
  const paginationData = (data) => {
    setBooksData(data);
  };
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div style={{ paddingTop: "4rem", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            color: "black",
            alignContent: "center",
            padding:'0 5rem 0 5rem',
            top:'0'
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
              value={sortBy}
              onChange={(e) => onSortChange(e)}
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
      <PaginationComponent data={allBooks} paginationData={paginationData} />
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
