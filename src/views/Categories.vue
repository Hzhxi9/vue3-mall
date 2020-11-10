<template>
  <div class="warp">
    <SearchBarComp />
    <main>
      <van-sidebar
        v-model="activeKey"
        :style="{ width: '120px', height: '100%' }"
      >
        <van-sidebar-item
          v-for="e in categories"
          :key="e.categoryId"
          :title="e.categoryName"
          @click="changeCategory"
        />
      </van-sidebar>
      <div class="categories">
        <CategoriesListComp
          v-for="e in categoriesList"
          :key="e.categoryId"
          :list="e"
        />
      </div>
    </main>
    <NavBarComp />
  </div>
</template>

<script lang="ts">
import SearchBarComp from "../components/SearchBarComp.vue";
import NavBarComp from "../components/NavBarComp.vue";
import CategoriesListComp from "../components/CategoriesListComp.vue";
import { getCategory } from "../api/api";
import { reactive, toRefs, onMounted } from "vue";
import * as ResTypes from "../types/response";
export default {
  name: "Categories",
  components: {
    SearchBarComp,
    NavBarComp,
    CategoriesListComp,
  },
  setup() {
    const state = reactive({
      activeKey: 0,
      categories: [] as ResTypes.CategoriesData[],
      categoriesList: [] as ResTypes.CategoriesData[],
    });

    onMounted(async () => {
      try {
        state.categories = await getCategory();
        state.categoriesList = state.categories[0].secondLevelCategoryVOS;
      } catch (error) {
        console.log(error);
      }
    });

    const changeCategory = (index: number) => {
      state.categoriesList = state.categories[index].secondLevelCategoryVOS;
    };

    return {
      ...toRefs(state),
      changeCategory,
    };
  },
};
</script>

<style lang="less">
.warp {
  main {
    display: flex;
    .categories {
      flex: 1;
      height: calc(100vh - 54px - 50px);
      overflow: auto;
    }
  }
}
</style>
