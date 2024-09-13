import axios from 'axios'

const client = axios.create({
    baseURL: process.env.URL,
    validateStatus: (status) => { return status >= 200 && status < 300 }
})

const request = async (options) => {
    const onSuccess = (res) => {
        return Promise.resolve(res)
    }
    const onError = (err) => {
        return Promise.reject(err.result);
    }
    const headers = {

    }
    const commonHeaders = {

    }
    try {
        const response = await client({
            ...options,
            // headers: { ...headers, ...commonHeaders },
        });
        return onSuccess(response);
    }
    catch (err) {
        return onError(err);

    }

}
export default request;