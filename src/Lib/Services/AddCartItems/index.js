import request from "../CommonService";

const addCartItemsService = (data) => {
  return request({
    url: "cartItems",
    method: "POST",
    data: { ...data },
  });
};
export default addCartItemsService;
