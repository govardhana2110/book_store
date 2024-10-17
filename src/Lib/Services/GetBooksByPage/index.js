import request from "../CommonService";

const getBooksByPageService = (page=0,size=10) => {
  return request({
    url: `api/books?page=${page}&size=${size}`,
    method: "GET",
  });
};
export default getBooksByPageService;
