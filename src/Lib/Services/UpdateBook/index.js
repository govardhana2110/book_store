import request from "../CommonService";

const updateBookService = (data,id=null) => {
  return request({
    url:id? `books/${id}`:`books`,
    method: "PUT",
    data: { ...data },
  });
};
export default updateBookService;
