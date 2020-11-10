import { useRouter, RouteLocationRaw } from "vue-router";
import router from "../router";

const mixins = {
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
