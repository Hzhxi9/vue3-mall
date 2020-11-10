<template>
<div class="warp">
    <SearchBarComp />
    <main>
        <van-sidebar v-model="activeKey" :style="{ width: '120px', height: '100%' }">
            <van-sidebar-item v-for="e in categories" :key="e.categoryId" :title="e.categoryName" />
        </van-sidebar>
    </main>
    <NavBarComp />
</div>
</template>

<script lang="ts">
import SearchBarComp from "../components/SearchBarComp.vue";
import NavBarComp from "../components/NavBarComp.vue";
import {
    getCategory
} from "../api/api";
import {
    reactive,
    toRefs,
    onMounted
} from "vue";
import * as ResTypes from "../types/response";
export default {
    name: "Categories",
    components: {
        SearchBarComp,
        NavBarComp,
    },
    setup() {
        const state = reactive({
            activeKey: 0,
            categories: [] as ResTypes.CategoriesData[],
        });

        onMounted(async () => {
            try {
                state.categories = await getCategory();
            } catch (error) {
                console.log(error);
            }
        });

        return {
            ...toRefs(state),
        };
    },
};
</script>

<style lang="less">
.warp {
    main {
        height: calc(100vh - 54px - 50px);
    }
}
</style>
