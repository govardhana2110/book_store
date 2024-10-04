import request from "../CommonService";

const getBooksByCategoryService = (category) => {
  return request({
    url: `api/books/category/${category}`,
    method: "GET",
  });
};
export default getBooksByCategoryService;
