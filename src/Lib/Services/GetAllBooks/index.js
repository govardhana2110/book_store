import request from "../CommonService";

const getAllBooksService = () => {
  return request({
    url: "api/books",
    method: "GET",
  });
};
export default getAllBooksService;
