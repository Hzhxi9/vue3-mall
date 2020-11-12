<template>
  <div class="empty" v-if="false">
    <img src="//s.yezgea02.com/1604028375097/empty-car.png" alt="空购物车" />
    <div class="title">购物车空空如也</div>
    <van-button round color="#1baeae" @click="jumpToPage({ name: 'Home' })"
      >前往选购</van-button
    >
  </div>
  <div class="cart" v-else>
    <GoodsCardComp v-for="(item, index) in goods" :key="index" :detail="item" />
    <van-submit-bar
      :price="total"
      button-text="提交订单"
      @submit="onSubmit"
      :style="{ bottom: '50px' }"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
  <NavBarComp />
</template>

<script lang="ts">
import NavBarComp from "../components/NavBarComp.vue";
import GoodsCardComp from "../components/GoodsCardComp.vue";
import { useStore } from "vuex";
import { reactive, toRefs, computed, watch } from "vue";
import mixins from "../mixins";
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
    });

    const goods = computed(() => store.getters.goods);

    const total = computed(() => {
      let result = 0;
      if (Array.isArray(goods.value)) {
        goods.value.forEach((item) => {
          if (item.checked) {
            result = result + item.goodsNum * item.originalPrice;
          }
        });
      }
      return result;
    });

    return {
      goods,
      total,
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
