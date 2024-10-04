import request from "../CommonService";

const updateCartItemService = (itemsQuantity, id) => {
  return request({
    url: `api/cartItems/${id}/quantity`,
    method: "PUT",
    data: { quantity:itemsQuantity },
  });
};
export default updateCartItemService;
