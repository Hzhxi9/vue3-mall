import { useRouter, RouteLocationRaw } from "vue-router";
import router from "../router";
import store from "../store";

const mixins = {
  data() {
    return {
      token: store.getters.token || null,
    };
  },

  methods: {
    jumpToPage(query: RouteLocationRaw | string) {
      typeof query === "string" ? (location.href = query) : router.push(query);
    },
    goBack(step: number = -1) {
      router.back();
    },
  },
};

export default mixins;
