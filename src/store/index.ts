import { createStore } from "vuex";

interface StateType {}

const store = createStore({
  state(): StateType {
    return {};
  },
  modules: {},
  actions: {},
  getters: {},
});

export default store;
