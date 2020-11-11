<template>
  <van-nav-bar title="商品详情" left-arrow @click-left="goBack" />
  <main></main>
</template>

<script lang="ts">
import { reactive, toRefs, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getDetail } from "../api/api";
import mixins from "../mixins";
export default {
  name: "GoodDetail",
  mixins: [mixins],
  setup() {
    const state = reactive({
      detail: null,
    });
    const route = useRoute();
    const id = computed(() => route.query.id);

    onMounted(async () => {
      try {
        const res = await getDetail({ id: Number(id) || 10908 });
        console.log(res, "res");
      } catch (error) {
        console.log(error);
      }
    });
    return {
      ...toRefs(state),
      id,
    };
  },
};
</script>

<style></style>
