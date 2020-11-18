<template>
  <van-nav-bar title="添加地址" left-arrow @click-left="goBack" />
  <div class="main">
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script lang="ts">
import mixins from "../mixins";

import { areaList } from "../utils/constant";
import { reactive, toRefs } from "vue";

export default {
  name: "AddAddress",
  mixins: [mixins],
  setup() {
    const state = reactive({
      areaList,
      searchResult: [],
    });

    const onSave = () => {};

    const onDelete = () => {};

    const onChangeDetail = () => {};

    return {
      ...toRefs(state),
      onSave,
      onDelete,
      onChangeDetail,
    };
  },
};
</script>
