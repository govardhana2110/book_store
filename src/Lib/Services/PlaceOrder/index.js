import request from "../CommonService";

const placeOrderService = (data) => {
  return request({
    url: "orderHistory",
    method: "POST",
    data: { ...data },
  });
};
export default placeOrderService;
