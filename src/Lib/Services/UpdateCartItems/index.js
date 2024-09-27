import request from "../CommonService";

const updateCartItemService = (data, id = null) => {
  return request({
    url: `cartItems/${id}`,
    method: "PUT",
    data: { ...data },
  });
};
export default updateCartItemService;
