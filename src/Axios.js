import axios from 'axios';

const customFetch = axios.create({
    //baseURL: "http://localhost:8080/api/",
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });
  
  const refreshToken = async () => {
    try {
      const resp = await customFetch.post("http://localhost:8080/api/auth/refresh");
      console.log("refresh token", resp.data);
      return resp.data;
    } catch (e) {
      console.log("Error",e);   
    }
  };

let isRefreshing = false;
let refreshPromise = null;

  customFetch.interceptors.response.use(
    (response) => response,
    async function (error) {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        if (!isRefreshing) {
          isRefreshing = true;
  
          try {
            await refreshToken();
            return customFetch(originalRequest);
          } catch (refreshError) {
            throw refreshError; 
          } finally {
            isRefreshing = false;
          }
        } else {
          if (!refreshPromise) {
            refreshPromise = refreshToken()
              .then(() => {
                return customFetch(originalRequest);
              })
              .catch((refreshError) => {
                throw refreshError; 
              })
              .finally(() => {
                refreshPromise = null;
                isRefreshing = false;
              });
  
            return refreshPromise;
          }
        }
      }
  
      return Promise.reject(error);
    }
  );

  export default customFetch;