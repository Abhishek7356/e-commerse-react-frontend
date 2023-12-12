import axios from 'axios'

export const commonApi = async (method, url, data, reqHeader) => {
    const axiosConfig = {
        method,
        url,
        data,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    }
    return await axios(axiosConfig).then((data) => data).catch((err) => err)
}