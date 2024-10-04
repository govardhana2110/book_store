import request from "../CommonService";

const updateOrderService = (orderStatus, id) => {
  return request({
    url: `api/orderHistory/${id}/orderStatus`,
    method: "PUT",
    data: {orderStatus:orderStatus},
  });
};
export default updateOrderService;
