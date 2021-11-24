import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
const Cloudinary = require("cloudinary-vue");
import "@/assets/styles/style.scss";
import "@/assets/styles/animation.scss";
Vue.config.productionTip = false;
Vue.use(Cloudinary, {
  configuration: {
    cloudName: "onmyojiimage",
  },
});
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
