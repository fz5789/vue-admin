import { Login } from "@/api/login";
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
};

const getters = {};
const mutations = {
  //同步 没有回调处理事情
  SET_COLLAPSE(state) {
    console.log(1232222221);
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  }
};
const actions = {
  //可以回调处理事情
  login(content, requestData) {
    return new Promise((resolve, reject) => {
      //接口
      Login(requestData)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
