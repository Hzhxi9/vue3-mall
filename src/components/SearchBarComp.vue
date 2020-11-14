<template>
  <div class="search">
    <van-search
      v-model.trim="keyword"
      show-action
      clearable
      shape="round"
      placeholder="请输入搜索关键词"
      @search="search"
    >
      <template #left v-if="showArrow">
        <van-icon name="arrow-left" @click="goBack" />
      </template>
    </van-search>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
export default {
  name: "SearchBarComp",
  props: {
    showArrow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const router = useRouter();
    const state = reactive({
      keyword: "",
    });

    const search = (value: string) => {
      if (!state.keyword) {
        Toast.fail("请输入关键词");
        return;
      }
      ctx.emit("search", value);
    };

    const goBack = () => {
      router.back();
    };

    return {
      ...toRefs(state),
      search,
      goBack,
    };
  },
};
</script>

<style lang="less" scoped>
.search {
  width: 100%;
}
</style>
