<template>
<van-nav-bar title="商品详情" left-arrow @click-left="goBack" />
<main>
    <van-swipe class="goods-swipe" :autoplay="3000" indicator-color="white" v-if="detail">
        <van-swipe-item v-for="e in detail.goodsCarouselList" :key="e">
            <img :src="e" alt="" />
        </van-swipe-item>
    </van-swipe>
    <div v-if="detail">
        <h1>{{ detail.goodsName }}</h1>
        <p>免邮费 顺丰包邮</p>
        <p>￥{{ detail.sellingPrice }}</p>
        <ul>
            <li>概述</li>
            <li>参数</li>
            <li>安装服务</li>
            <li>常见问题</li>
        </ul>
        <div v-html="detail.goodsDetailContent"></div>
    </div>
</main>
<van-action-bar>
    <van-action-bar-icon icon="chat-o" text="客服" />
    <van-action-bar-icon icon="cart-o" text="购物车" :badge="goods && goods.length" @click="jumpToPage({ name: 'Cart' })" />
    <van-action-bar-button color="#be99ff" type="warning" text="加入购物车" @click="addCart" />
    <van-action-bar-button color="#7232dd" type="danger" text="立即购买" @click="jumpCart" />
</van-action-bar>
</template>

<script lang="ts">
import {
    reactive,
    toRefs,
    computed,
    onMounted
} from "vue";
import {
    useRoute
} from "vue-router";
import {
    useStore,
    mapGetters
} from "vuex";
import {
    getDetail
} from "../api/api";
import {
    GoodsDetailData
} from "../types/response";
import {
    UserMutations
} from "../store/mutation-types";
import mixins from "../mixins";
import router from "../router";
export default {
    name: "GoodDetail",
    mixins: [mixins],
    setup() {
        const state = reactive({
            detail: null as GoodsDetailData | null,
        });
        const route = useRoute();
        const store = useStore();
        const id = computed(() => route.query.id);
        console.log("id", id.value);
        const goods = computed((): {
            goodsCoverImg: string;
            goodsId: number;
            goodsName: string;
            originalPrice: number;
            goodsNum: number;
        } [] => {
            return store.getters.goods;
        });

        onMounted(async () => {
            try {
                state.detail = await getDetail({
                    id: Number(id.value),
                });
            } catch (error) {
                console.log(error);
            }
        });

        const addCart = () => {
            if (state.detail) {
                const {
                    goodsCoverImg,
                    goodsId,
                    goodsName,
                    originalPrice,
                } = state.detail;
                store.commit(UserMutations.SET_GOODS, {
                    goodsCoverImg,
                    goodsId,
                    goodsName,
                    originalPrice,
                });
            }
        };

        const jumpCart = () => {
            if (state.detail) {
                const {
                    goodsCoverImg,
                    goodsId,
                    goodsName,
                    originalPrice,
                } = state.detail;
                store.commit(UserMutations.SET_GOODS, {
                    goodsCoverImg,
                    goodsId,
                    goodsName,
                    originalPrice,
                });
                router.push({
                    name: "Cart",
                });
            }
        };
        return {
            ...toRefs(state),
            id,
            goods,
            addCart,
            jumpCart,
        };
    },
};
</script>

<style lang="less" scoped>
.goods-swipe {
    width: 100%;

    img {
        width: 100%;
    }
}

main {
    height: calc(100vh - 46px - 50px);
    overflow: auto;

    >div {
        padding: 0 2.67vw;

        h1 {
            font-size: 4.8vw;
            color: #333;
        }

        p {
            font-size: 3.73vw;
            color: #999;
            padding: 1.33vw 0;

            &:last-of-type {
                color: #F63515;
                font-size: 4.8vw;
                padding: 0;
            }
        }

        ul {
            display: flex;
            margin: 2.67vw 0;

            li {
                width: 25%;
                text-align: center;
                font-size: 4vw;
                color: #999;

                &:not(:last-child) {
                    border-right: 1px solid #999;
                }
            }
        }
    }
}
</style>
