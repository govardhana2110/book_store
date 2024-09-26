import request from "../CommonService";

const deleteBookService = (id) => {
  return request({
    url: `books/${id}`,
    method: "DELETE",
  });
};
export default deleteBookService;
