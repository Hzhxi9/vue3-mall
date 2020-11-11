import axios, { AxiosRequestConfig } from "axios";
import router from "../router";
import { Toast } from "vant";

const baseURL =
  process.env.NODE_ENV == "development"
    ? "//47.99.134.126:28019/api/v1"
    : "//47.99.134.126:28019/api/v1";

const service = axios.create({
  baseURL,
  // withCredentials: true,
  timeout: 5000,
});

service.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
service.defaults.headers.post["Content-Type"] = "application/json";
service.defaults.headers["token"] = localStorage.getItem("token") || null;

service.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    Toast({
      message: error.data.message,
      duration: 1500,
      forbidClick: true,
    });
    return Promise.reject(error);
  }
);

export default function request(config: AxiosRequestConfig) {
  return service(config).then(response => {
    Toast.loading("加载中");
    if (typeof response.data !== "object") {
      Toast.fail("服务器异常");
      return Promise.reject(response);
    }
    if (response.data.resultCode !== 200) {
      if (response.data.message) Toast.fail(response.data.message);
      // if (response.data.resultCode === 416) router.push({ name: "Login" });
      return Promise.reject(response.data);
    }
    Toast.clear();
    return Promise.resolve(response.data.data);
  });
}
