import service from "@/utils/request";
/*获取验证码*/
export function GetSms(data) {
  return service.request({
    method: "post",
    url: "/getSms/",
    data
    //data:data  左边data是变量名（key）后台接收的。右边data是接受的参数  同名写一个es6
  });
}
/*获取用户角色*/
/*登录*/
export function Login(data) {
  return service.request({
    method: "post",
    url: "/login/",
    data
  });
}
/*注册*/
export function Register(data) {
  return service.request({
    method: "post",
    url: "/register/",
    data
  });
}
