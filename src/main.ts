import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Api from "@/lendi-api";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.$api = Api;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
