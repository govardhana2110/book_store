import request from "../CommonService";

const loginService = (data) => {
  return request({
    url: "login",
    method: "POST",
    data: { ...data },
  });
};
export default loginService;
