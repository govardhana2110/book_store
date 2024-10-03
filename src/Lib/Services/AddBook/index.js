import request from "../CommonService";

const addBookService = (data) => {
  return request({
    url: "api/books/add",
    method: "POST",
    headers: {'Content-Type': 'multipart/form-data'},
    data,
  });
};
export default addBookService;
