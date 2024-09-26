import request from "../CommonService";

const registerService = (data) => {
  return request({
    url: "users",
    method: "POST",
    data: { ...data },
  });
};
export default registerService;
