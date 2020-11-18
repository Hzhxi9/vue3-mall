<template>
  <van-nav-bar title="地址管理" left-arrow @click-left="goBack" />
  <div class="main">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="jumpToPage({ name: 'AddAddress' })"
      @edit="onEdit"
    >
      <template #top>
        <div class="empty" v-if="!list.length">
          <img src="//s.yezgea02.com/1604028375097/empty-car.png" />
          暂未添加地址
        </div>
      </template>
    </van-address-list>
  </div>
</template>

<script lang="ts">
import mixins from "../mixins";

import { getAddressList, getDefaultAddress } from "../api/api";
import { reactive, toRefs, onMounted } from "vue";

export default {
  name: "Address",
  mixins: [mixins],
  setup() {
    const state = reactive({
      chosenAddressId: "1",
      list: [],
    });

    onMounted(async () => {
      const res = await getAddressList({ pageNumber: 1, pageSize: 10 });
      state.list = res;
    });

    const onAdd = () => {};

    const onEdit = () => {};

    return {
      ...toRefs(state),
      onAdd,
      onEdit,
    };
  },
};
</script>

<style lang="less" scoped>
.main {
  height: calc(100vh - 46px);
}
</style>
