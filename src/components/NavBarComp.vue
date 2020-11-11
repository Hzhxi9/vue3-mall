<template>
<van-tabbar v-model="active" active-color="#1baeae" route>
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="points" to="/categories">分类</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="manager-o" to="/mine">我的</van-tabbar-item>
</van-tabbar>
</template>

<script lang="ts">
import {
    reactive,
    toRefs
} from "vue";
export default {
    name: "NavBarComp",
    setup() {
        const state = reactive({
            active: 0,
        });

        return {
            ...toRefs(state),
        };
    },
};
</script>

<style>
</style>
