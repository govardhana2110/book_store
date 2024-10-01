import request from "../CommonService";

const registerService = (data) => {
  return request({
    url: "register",
    method: "POST",
    data: { ...data },
  });
};
export default registerService;
