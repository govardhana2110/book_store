import request from "../CommonService";

const placeOrderService = (data) => {
  return request({
    url: "/api/orderHistory/add",
    method: "POST",
    data: { ...data },
  });
};
export default placeOrderService;
