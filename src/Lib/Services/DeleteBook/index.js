import request from "../CommonService";

const deleteBookService = (id) => {
  return request({
    url: `api/books/${id}`,
    method: "DELETE",
  });
};
export default deleteBookService;
