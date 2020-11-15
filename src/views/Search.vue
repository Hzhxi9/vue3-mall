<template>
  <div class="search-box">
    <SearchBarComp
      showArrow
      @search="handleSearch"
      @change="handleChange"
      @cancel="handleCancel"
    />

    <van-tabs v-model:active="active" color="#1baeae" @click="changeTab">
      <van-tab title="推荐" name=""></van-tab>
      <van-tab title="新品" name="new"></van-tab>
      <van-tab title="价格" name="price"></van-tab>
    </van-tabs>

    <EmptyComp v-if="!list.length" />

    <div class="list" v-else>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
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

import { reactive, toRefs, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { search } from "../api/api";

import * as ResTypes from "../types/response";

export default {
  name: "Search",
  components: {
    SearchBarComp,
    EmptyComp,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      active: 0,
      refreshing: false,
      loading: true,
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

      state.totalPage = res.totalPage;
      state.list = [...state.list, ...res.list];
      state.loading = false;
      if (state.page >= res.totalPage) {
        state.finished = true;
        return;
      }
    };

    const onLoad = () => {
      if (!state.refreshing && state.page <= state.totalPage) {
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

    const changeTab = (name: string) => {
      state.orderBy = name;
      onRefresh();
    };

    const handleChange = () => {
      state.refreshing = false;
      state.finished = false;
      state.loading = false;
      state.page = 1;
      state.list = [];
    };

    const handleCancel = () => {
      state.refreshing = false;
      state.finished = false;
      state.loading = false;
      state.page = 1;
      state.list = [];
      router.back();
    };

    return {
      ...toRefs(state),
      onRefresh,
      onLoad,
      handleSearch,
      changeTab,
      handleChange,
      handleCancel,
    };
  },
};
</script>

<style lang="less">
.search-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
.card {
  padding: 2.67vw 0;
  border-bottom: 1px solid #dcdcdc;
  &:first-child {
    border-top: 1px solid #dcdcdc;
  }
}
.list {
  height: calc(100vh - 54px - 44px);
  overflow: auto;
}
</style>
