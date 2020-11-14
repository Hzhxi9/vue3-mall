<template>
  <div class="empty">
    <img :src="emptyIcon" />
    <div class="title">{{ emptyText }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: "EmptyComp",
  props: {
    emptyIcon: {
      type: String,
      default: "//s.yezgea02.com/1604041313083/kesrtd.png",
    },
    emptyText: {
      type: String,
      default: "搜索想要的商品",
    },
  },
};
</script>

<style lang="less">
.empty {
  text-align: center;
  img {
    width: 40vw;
    height: auto;
    display: block;
    margin: 13.33vw auto 5.33vw;
  }
  .title {
    color: #999;
    font-size: 3.73vw;
  }
}
</style>
