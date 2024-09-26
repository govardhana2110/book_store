import request from "../CommonService";

const getCartItemsService = () => {
  return request({
    url: "cartItems",
    method: "GET",
  });
};
export default getCartItemsService;
