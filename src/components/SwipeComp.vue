<template>
<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item>1</van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
</van-swipe>
</template>

<script lang="ts">
import {
    Swipe,
    SwipeItem
} from "vant";
export default {
    name: "SwipeComp",
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
    },
};
</script>

<style lang="less">
</style>
