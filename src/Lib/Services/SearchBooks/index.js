import request from "../CommonService";

const searchBooksService = (searchTerm) => {
  return request({
    url: `api/books/search?searchTerm=${searchTerm}`,
    method: "GET",
  });
};
export default searchBooksService;
