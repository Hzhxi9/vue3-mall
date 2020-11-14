<template>
  <div class="search-box">
    <SearchBarComp showArrow @search="handleSearch" />

    <van-tabs v-model:active="active" color="#1baeae" @click="changeTab">
      <van-tab title="推荐" name=""></van-tab>
      <van-tab title="新品" name="new"></van-tab>
      <van-tab title="价格" name="price"></van-tab>
    </van-tabs>

    <!-- <EmptyComp /> -->

    <div class="list">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          @offset="10"
        >
          <div class="card" v-for="i in list" :key="i.goodsId">
            <van-card
              :price="i.sellingPrice.toFixed(2)"
              :desc="i.goodsIntro"
              :title="i.goodsName"
              :thumb="$filters.prefix(i.goodsCoverImg)"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script lang="ts">
import SearchBarComp from "../components/SearchBarComp.vue";
import EmptyComp from "../components/EmptyComp.vue";

import { reactive, toRefs } from "vue";
import { search } from "../api/api";

import * as ResTypes from "../types/response";

export default {
  name: "Search",
  components: {
    SearchBarComp,
    EmptyComp,
  },
  setup() {
    const state = reactive({
      active: 0,
      refreshing: false,
      loading: false,
      finished: false,
      list: [] as ResTypes.GoodsData[],
      totalPage: 0,
      page: 1,
      orderBy: "",
      keyword: "",
    });

    const init = async () => {
      if (!state.keyword) {
        state.finished = true;
        state.loading = false;
        return;
      }
      const data = {
        pageNumber: state.page,
        goodsCategoryId: "",
        keyword: state.keyword,
        orderBy: state.orderBy,
      };
      const res = await search(data);
      state.list = [...res.list, ...state.list];
      state.totalPage = res.totalPage;

      state.loading = false;
      if (state.page >= res.totalPage) {
        state.finished = true;
      }
    };

    const onLoad = () => {
      if (!state.refreshing && state.page < state.totalPage) {
        state.page = state.page + 1;
      }
      if (state.refreshing) {
        state.list = [];
        state.refreshing = false;
      }
      init();
    };

    const onRefresh = () => {
      state.refreshing = true;
      state.finished = false;
      state.loading = true;
      state.page = 1;
      onLoad();
    };

    const handleSearch = (value: string) => {
      state.keyword = value;
      onRefresh();
    };

    const changeTab = () => {};

    return {
      ...toRefs(state),
      onRefresh,
      onLoad,
      handleSearch,
      changeTab,
    };
  },
};
</script>

<style lang="less">
.card {
  padding: 2.67vw 0;
  border-bottom: 1px solid #dcdcdc;
  &:first-child {
    border-top: 1px solid #dcdcdc;
  }
}
.list {
  height: calc(100vh - 54px - 44px);
  overflow: hidden;
  overflow-y: scroll;
}
</style>
