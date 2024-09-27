import request from "../CommonService";

const deleteCartItemService = (id) => {
  return request({
    url: `cartItems/${id}`,
    method: "DELETE",
  });
};
export default deleteCartItemService;
