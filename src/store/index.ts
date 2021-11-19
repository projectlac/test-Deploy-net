import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    auth: false,
  },
  modules: {},
};
export default new Vuex.Store<RootState>(store);
