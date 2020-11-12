<template>
<div class="goods-card">
    <van-swipe-cell>
        <van-checkbox v-model="checked"></van-checkbox>
        <van-card :num="detail.goodsNum" :price="detail.originalPrice" :title="detail.goodsName" :thumb="detail.goodsCoverImg">
            <template #footer>
                <van-stepper v-model="value" min="1" max="5" />
            </template>
        </van-card>
        <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
        </template>
    </van-swipe-cell>
</div>
<slot />
</template>

<script lang="ts">
import {
    reactive,
    toRefs,
    computed
} from "vue";
export default {
    name: "GoodsCardComp",
    props: {
        detail: {
            type: Object as() => {
                goodsCoverImg: string;
                goodsId: number;
                goodsName: string;
                originalPrice: number;
                goodsNum: number;
                checked: boolean;
            },
            default: () => {},
        },
    },
    setup(props, ctx) {
        const state = reactive({
            // checked: true,
            value: 1,
        });

        checked: computed(() => {
            get: () => {
                return props.detail.checked;
            };
            set: (val: boolean) => {
                ctx.emit("update:check", val);
            };
        });

        console.log(props);
        return {
            ...toRefs(state),
        };
    },
};
</script>

<style lang="less" scoped>
.goods-card {
    // padding: 2.67vw 0;

    ::v-deep .van-swipe-cell__wrapper {
        // flex: 1;
        display: flex;

        .van-card {
            flex: 1;
        }
    }
}

.delete-button {
    height: 100%;
}
</style>
