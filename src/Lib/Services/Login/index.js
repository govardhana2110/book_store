import request from "../CommonService";

const loginService = () => {
  return request({
    url: "users",
    method: "GET",
  });
};
export default loginService;
