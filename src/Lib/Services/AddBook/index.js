import request from "../CommonService";

const addBookService = (data) => {
  return request({
    url: "books",
    method: "POST",
    data: { ...data },
  });
};
export default addBookService;
