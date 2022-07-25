import axios from "axios";
import jwt_decode from "jwt-decode";

const refreshToken = async () => {
  try {
    const res = await axios.post("/v1/auth/refresh", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (dispatch, stateSuccess, currentUser) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      const jwtDecoded = jwt_decode(currentUser?.accessToken);
      if (Date.now() >= jwtDecoded.exp * 1000) {
        const newAccessToken = await refreshToken();
        const refreshUser = {
          ...currentUser,
          accessToken: newAccessToken.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + newAccessToken.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
