import { Login } from "@/api/login";
import {
  setToken,
  setUserName,
  getUserName,
  removeUserName,
  removeToken
} from "@/utils/app";
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  to_ken: "",
  username: getUserName() || ""
};

const getters = {
  isCollapse: state => state.isCollapse
};
const mutations = {
  //同步 没有回调处理事情
  SET_COLLAPSE(state) {
    console.log(1111);
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },

  SET_TOKEN(state, value) {
    state.to_ken = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  }
};
const actions = {
  //可以回调处理事情
  login({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      //接口
      Login(requestData)
        .then(response => {
          let data = response.data.data;
          // console.log(content);
          //token username
          //普通
          // content.commit("SET_TOKEN", data.token);
          // content.commit("SET_USERNAME", data.username);
          //解构
          commit("SET_TOKEN", data.token);
          commit("SET_USERNAME", data.username);
          setToken(data.token);
          setUserName(data.username);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  //退出
  exit({ commit }) {
    // console.log(111);
    return new Promise((resolve, reject) => {
      removeUserName();
      removeToken();
      commit("SET_TOKEN", "");
      commit("SET_USERNAME", "");
      resolve();
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
