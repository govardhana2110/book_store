import request from "../CommonService";

const addCartItemsService = (data) => {
  return request({
    url: "api/cartItems/add",
    method: "POST",
    data: { ...data },
  });
};
export default addCartItemsService;
