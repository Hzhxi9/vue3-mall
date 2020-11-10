import { useRouter, RouteLocationRaw } from "vue-router";

const mixins = {
  methods: {
    jumpToPage(query: RouteLocationRaw | string) {
      typeof query === "string" ? (location.href = query) : useRouter().push(query);
    },
  },
};

export default mixins;
