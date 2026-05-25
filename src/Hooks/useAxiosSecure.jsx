import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(async (config) => {
    // ✅ FIX: accessToken কাজ করে না — getIdToken() দিয়ে fresh token নিতে হবে
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => Promise.reject(error));

  axiosSecure.interceptors.response.use(res => res, error => {
    const status = error?.response?.status;
    if (status === 403) {
      navigate('/forbidden');
    } else if (status === 401) {
      logOut()
        .then(() => navigate('/login'))
        .catch(() => {});
    }
    return Promise.reject(error);
  });

  return axiosSecure;
};

export default useAxiosSecure;