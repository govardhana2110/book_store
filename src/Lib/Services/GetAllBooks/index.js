import request from "../CommonService";

const getAllBooksService = () => {
  return request({
    url: "books",
    method: "GET",
  });
};
export default getAllBooksService;
