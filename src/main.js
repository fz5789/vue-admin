import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from "@vue/composition-api";
import router from "./router/index";
import store from "./store/index.js";
//引入element-ui组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//自定义全局组件
import "./icons/index.js";
import "./router/permit";

Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

//runtime运行模式
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
