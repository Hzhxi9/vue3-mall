import { createStore } from "vuex";
import { UserMutations } from "./mutation-types";

interface StateType {
  token: string | null;
}

const store = createStore({
  state: {
    token: null,
  },
  mutations: {
    [UserMutations.SET_TOKEN](state: StateType, token: string | null) {
      state.token = token;
    },
  },
  actions: {},
  getters: {
    token: (state: { token: string | null }) => state.token,
  },
});

export default store;
