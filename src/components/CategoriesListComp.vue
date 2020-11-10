<template>
  <div class="warp">
    <h3>{{ list.categoryName }}</h3>
    <ul>
      <li v-for="item in list.thirdLevelCategoryVOS" :key="item.categoryId">
        <img
          src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png"
          class="product-img"
        />
        <p>{{ item.categoryName }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { CategoriesData } from "../types/response";
export default {
  name: "CategoriesListComp",
  props: {
    list: {
      type: Object as () => CategoriesData,
      default: () => {},
    },
  },
};
</script>

<style lang="less">
.warp {
  h3 {
    padding: 5.33vw;
    font-size: 4.53vw;
    font-weight: 500;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    li {
      width: 33.33%;
      img {
        width: 8vw;
        height: 8vw;
        display: block;
        margin: 0 auto;
      }
      p {
        margin: 5.333vw 0;
        text-align: center;
      }
    }
  }
}
</style>
