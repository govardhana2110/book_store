import request from "../CommonService";

const updateBookService = ({data,id}) => {
  return request({
    url: `books/${id}`,
    method: "PUT",
    data: { ...data },
  });
};
export default updateBookService;
