<template>
  <router-view />
</template>

<script lang="ts">
import { useStore } from "vuex";
import { UserMutations } from "./store/mutation-types";
export default {
  name: "App",
  setup() {
    const store = useStore();
    const token = localStorage.getItem("token");
    token && store.commit(UserMutations.SET_TOKEN, token);
  },
};
</script>
