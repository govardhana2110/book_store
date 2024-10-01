import request from "../CommonService";

const loginService = (data) => {
  return request({
    url: "login",
    method: "POST",
    data
  });
};
export default loginService;
