<template>
  <van-swipe class="carousel" :autoplay="3000" indicator-color="#1baeae">
    <van-swipe-item v-for="e in list" :key="e.redirectUrl">
      <img :src="e.carouselUrl" @click="jumpToPage(e.redirectUrl)" />
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import * as ResTypes from "../types/response";
import mixins from "../mixins";
export default {
  name: "SwipeComp",
  mixins: [mixins],
  props: {
    list: {
      type: Array as () => ResTypes.CarouselsData[],
    },
  },
};
</script>

<style lang="less" scoped>
.carousel {
  width: 100%;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}
</style>
