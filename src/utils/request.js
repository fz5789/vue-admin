import axios from "axios";
import { Message } from "element-ui";
// 创建变量axios 赋给service
// 手把手撸码前端Api，地址 http ://www.web-jshtml.cn/productapi
const BASEURL = process.env.NODE_ENV === "production" ? " " : "/devApi";
const service = axios.create({
  baseURL: BASEURL, //http://192.168.0.103:8080/devApi/   ==  http ://www.web-jshtml.cn/productapi
  timeout: 10000 //超时
  //网络请求接口尽量时间长一点
});
// 添加请求拦截器
//请求接口前 ，做一些数据处理
service.interceptors.request.use(
  function(config) {
    //在发送请求之前做些什么
    //后台需要前端传相关的参数(在请求头添加参数)
    // tokey
    //userid
    //suid
    //业务需求

    //最终目的在请求头添加参数
    config.headers["tokey"] = "1111";

    return config;
  },
  function(error) {
    //对请求错误做些什么
    return Promise.reject(error);
  }
);
//请求接口后，返回数据进行拦截 (响应拦截器)
// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    let data = response.data;
    if (data.resCode !== 0) {
      Message.error(data.message);
      return Promise.reject(data);
    } else {
      return response;
      // return Promiise.resolve(data)
    }
  },
  function(error) {
    // 对响应数据做点什么
    return Promise.reject(error);
  }
);
export default service;
/*
使用export default 但不能同时存在多个default
文件import不需要花括号
*/
