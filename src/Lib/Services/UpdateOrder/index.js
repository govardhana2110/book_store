import request from "../CommonService";

const updateOrderService = (data,id) => {
  return request({
    url: `orderHistory/${id}`,
    method: "PUT",
    data: { ...data },
  });
};
export default updateOrderService;
