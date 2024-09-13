import request from "../CommonService";

const LoginService = (data) => {
    return request({
        url: 'login',
        method: 'POST',
        data:{...data}
    })
}
export default LoginService