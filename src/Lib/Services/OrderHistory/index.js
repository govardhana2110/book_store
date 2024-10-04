import request from "../CommonService";

const getOrderHistoryService = () => {
  return request({
    url: "api/orderHistory",
    method: "GET",
  });
};
export default getOrderHistoryService;
