import request from "../CommonService";

const deleteCartItemService = (id) => {
  return request({
    url: `api/cartItems/${id}`,
    method: "DELETE",
  });
};
export default deleteCartItemService;
