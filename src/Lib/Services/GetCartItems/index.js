import request from "../CommonService";

const getCartItemsService = () => {
  return request({
    url: "api/cartItems",
    method: "GET",
  });
};
export default getCartItemsService;
