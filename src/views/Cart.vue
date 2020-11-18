<template>
  <div class="empty" v-if="!goods.length">
    <img src="//s.yezgea02.com/1604028375097/empty-car.png" alt="空购物车" />
    <div class="title">购物车空空如也</div>
    <van-button round color="#1baeae" @click="jumpToPage({ name: 'Home' })">前往选购</van-button>
  </div>


  <div class="cart" v-else>
    <van-checkbox-group v-model="result" ref="checkboxGroup" @change="groupChange">
      <GoodsCardComp
        v-for="(item, index) in goods"
        :key="index"
        :detail="item"
        :name="item.goodsId"
      />
    </van-checkbox-group>

    <van-submit-bar
      :price="total"
      button-text="提交订单"
      @submit="onSubmit"
      :style="{ bottom: '50px' }"
    >
      <van-checkbox v-model="checked" @click="changeAll">全选</van-checkbox>
    </van-submit-bar>
    
  </div>
  <NavBarComp />
</template>

<script lang="ts">
import NavBarComp from "../components/NavBarComp.vue";
import GoodsCardComp from "../components/GoodsCardComp.vue";
import mixins from "../mixins";

import { useStore } from "vuex";
import { reactive, toRefs, ref, computed, watch, onMounted } from "vue";
import { UserMutations } from "../store/mutation-types";
import { GoodType } from "../store";

export default {
  name: "Cart",
  mixins: [mixins],
  components: {
    NavBarComp,
    GoodsCardComp,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      checked: true,
      result: [] as number[],
    });

    onMounted(() => {
      if (Array.isArray(goods.value)) {
        state.result = goods.value.map((item: GoodType) => item.goodsId);
      }
    });

    const goods = computed(() => store.getters.goods);

    const total = computed(() => {
      let result = 0;
      if (Array.isArray(goods.value)) {
        let _goods = goods.value.filter((item) => state.result.includes(item.goodsId));
        _goods.forEach((item) => {
          result += item.originalPrice * item.goodsNum * 100;
        });
      }
      return result;
    });

    const groupChange = (result: number[]) => {
      state.checked = result.length === goods.value.length ? true : false;
    };

    const changeAll = () => {
      state.result = state.checked ? goods.value.map((item: GoodType) => item.goodsId) : [];
    };

    return {
      ...toRefs(state),
      goods,
      total,
      changeAll,
      groupChange,
    };
  },
};
</script>

<style lang="less" scoped>
.empty {
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 40vw;
    height: auto;
    display: block;
    margin-bottom: 5.33vw;
  }

  .title {
    font-size: 4.27vw;
    margin-bottom: 5.33vw;
  }
}

.cart {
  height: calc(100vh - 50px);
}
</style>
