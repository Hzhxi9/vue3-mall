<template>
  <div class="goods-list">
    <h3>{{ title }}</h3>
    <ul>
      <li
        v-for="e in list"
        :key="e.goodsId"
        @click="jumpToPage({ name: 'GoodDetail', query: { id: e.goodsId } })"
      >
        <img :src="$filters.prefix(e.goodsCoverImg)" :alt="e.goodsName" class="good-img" />
        <p>{{ e.goodsName }}</p>
        <span>￥{{ e.sellingPrice }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { GoodsData } from "../types/response";
import mixins from "../mixins";
export default {
  name: "GoodsListComp",
  mixins: [mixins],
  props: {
    title: {
      type: String,
      default: "",
    },
    list: {
      type: Array as () => GoodsData[],
    },
  },
};
</script>

<style lang="less" scoped>
.goods-list {
  h3 {
    height: 13.33vw;
    line-height: 13.33vw;
    background: #f9f9f9;
    color: #1baeae;
    font-size: 4.27vw;
    font-weight: 500;
    text-align: center;
  }

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      flex-basis: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid #e9e9e9;
      padding: 2.67vw;

      &:nth-child(n + 1) {
        border-right: 1px solid #e9e9e9;
      }

      .good-img {
        width: 32vw;
        height: 32vw;
        height: auto;
      }

      p {
        padding-top: 2.67vw;
        color: #222333;
        font-size: 3.73vw;
        text-align: center;
        min-height: 11.2vw;
      }

      span {
        color: #1baeae;
        font-size: 3.73vw;
        padding-bottom: 2.67vw;
      }
    }
  }
}
</style>
