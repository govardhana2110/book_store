import request from "../CommonService";

const getOrderHistoryService = () => {
  return request({
    url: "orderHistory",
    method: "GET",
  });
};
export default getOrderHistoryService;
