<template>
<div class="warp">
    <header class="nar-bar" :class="{ active: isChangheColor }">
        <van-icon name="apps-o" size="20" :color="isChangheColor ? '#fff' : '#1baeae'" />
        <div>
            <h3>新蜂商城</h3>
            <span>山海无恙,人间皆安</span>
        </div>
        <span>登录</span>
    </header>

    <SwipeComp :list="carousels"></SwipeComp>
    <nav>
        <ul>
            <li v-for="e in categoryList" :key="e.categoryId">
                <img :src="e.imgUrl" :alt="e.name" />
                <p>{{ e.name }}</p>
            </li>
        </ul>
    </nav>

    <main>
        <GoodsListComp title="新品上新" :list="news" />
        <GoodsListComp title="热门商品" :list="hots" />
        <GoodsListComp title="最新推荐" :list="recommend" />
    </main>
    <NavBarComp />
</div>
</template>

<script lang="ts">
import SwipeComp from "../components/SwipeComp.vue";
import NavBarComp from "../components/NavBarComp.vue";
import GoodsListComp from "../components/GoodsListComp.vue";
import {
    categoryList
} from "../utils/constant";
import {
    getHome
} from "../api/api";
import {
    reactive,
    onMounted,
    toRefs,
    nextTick
} from "vue";
import * as ResTypes from "../types/response";

export default {
    name: "Home",
    components: {
        SwipeComp,
        NavBarComp,
        GoodsListComp,
    },

    setup() {
        const state = reactive({
            carousels: [] as ResTypes.CarouselsData[],
            hots: [] as ResTypes.GoodsData[],
            news: [] as ResTypes.GoodsData[],
            recommend: [] as ResTypes.GoodsData[],
            isChangheColor: false,
            categoryList,
        });

        onMounted(async () => {
            try {
                const res = await getHome();
                state.carousels = res.carousels;
                state.hots = res.hotGoodses;
                state.news = res.newGoodses;
                state.recommend = res.recommendGoodses;
            } catch (error) {
                console.log(error);
            }
        });

        nextTick(() => {
            const warpElemnt = document.querySelector(".warp") as HTMLDivElement;
            warpElemnt.addEventListener("scroll", () => {
                const top = warpElemnt.scrollTop;
                state.isChangheColor = top > 100 ? true : false;
            });
        });

        return {
            ...toRefs(state),
        };
    },
};
</script>

<style lang="less" scoped>
.warp {
    height: calc(100vh - 50px);
    overflow: auto;

    .nar-bar.active {
        background-color: #1baeae;

        >span {
            color: #fff;
        }
    }

    .nar-bar {
        width: 100vw;
        height: 13.33vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;

        >div {
            display: flex;
            align-items: center;
            padding: 1.33vw 0;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 5.33vw;

            h3 {
                font-size: 5.33vw;
                color: #1baeae;
                font-weight: bold;
                padding: 0 2.67vw;
                border-right: 1px solid #666;
            }

            span {
                font-size: 3.2vw;
                color: #666;
                padding: 0 2.67vw;
            }
        }

        >span {
            color: #1baeae;
            font: 4vw;
        }
    }

    nav {
        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                width: 20%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-top: 3.47vw;

                img {
                    width: 9.6vw;
                    height: 9.6vw;
                }

                p {
                    font-size: 4vw;
                    color: #2c3e50;
                    margin-top: 2.13vw;
                }
            }
        }
    }
}
</style>
