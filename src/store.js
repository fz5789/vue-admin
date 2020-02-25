// import Vue from "vue";
// import Vuex from "vuex";
// import Cookie from "js-cookie";
// import { Login } from "@/api/login";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
//     // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false
//   },
//   getters: {
//     //computd可以计算 if判断
//     // isCollapse: false,
//   },
//   mutations: {
//     //同步 没有回调处理事情
//     SET_COLLAPSE(state) {
//       // console.log(333);
//       state.isCollapse = !state.isCollapse;
//       //HTML5储存 解决刷新还原菜单栏效果
//       // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
//       sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
//       // console.log(state.isCollapse);
//     }
//   },
//   actions: {
//     //可以回调处理事情
//     login(content, requestData) {
//       return new Promise((resolve, reject) => {
//         //接口
//         Login(requestData)
//           .then(response => {
//             resolve(response);
//           })
//           .catch(error => {
//             reject(error);
//           });
//       });
//     }
//   },
//   modules: {}
// });
