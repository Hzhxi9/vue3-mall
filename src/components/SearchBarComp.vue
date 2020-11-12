<template>
<div class="search">
    <van-search v-model.trim="keyword" show-action clearable shape="round" placeholder="请输入搜索关键词" @search="search">
        <template #left v-if="showArrow">
            <van-icon name="arrow-left" />
        </template>
    </van-search>
</div>
</template>

<script lang="ts">
import {
    reactive,
    toRefs
} from "vue";
export default {
    name: "SearchBarComp",
    props: {
        showArrow: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        const state = reactive({
            keyword: "",
        });

        const search = (value: string) => {
            //
        };

        return {
            ...toRefs(state),
            search,
        };
    },
};
</script>

<style lang="less" scoped>
.search {
    width: 100%;
}
</style>
