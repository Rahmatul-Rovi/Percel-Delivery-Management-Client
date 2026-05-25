import axios from "axios";

const axiosInstance = axios.create({
    baseURL : `https://percel-server-beige.vercel.app`
})

const useAxios = () => {
    return axiosInstance
};

export default useAxios;