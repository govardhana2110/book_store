import request from "../CommonService";

const updateBookService = (data, id) => {
  return request({
    url: `api/books/${id}`,
    method: "PUT",
    data,
  });
};
export default updateBookService;
