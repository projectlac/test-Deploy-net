import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/assets/styles/style.scss";
import "@/assets/styles/animation.scss";

// import { Auth0Plugin } from "./auth";

// const domain: string = "dev-onmy.us.auth0.com";
// const clientId: string = "gkroK9KJ7sMo8sL8Dp4Io7qXbivHesbD";

/* eslint-disable */

// Vue.use(Auth0Plugin, {
//   domain,
//   clientId,

//   onRedirectCallback: (appState: any) => {
//     router.push(
//       appState && appState.targetUrl
//         ? appState.targetUrl
//         : window.location.pathname
//     );
//   },
// });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
