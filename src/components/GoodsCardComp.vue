<template>
<div class="goods-card">
    <van-swipe-cell>
        <van-checkbox :name="name"></van-checkbox>
        <van-card :num="detail.goodsNum" :price="price" :title="detail.goodsName" :thumb="$filters.prefix(detail.goodsCoverImg)">
            <template #footer>
                <van-stepper v-model="value" min="1" max="5" />
            </template>
        </van-card>
        <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="onDelete(detail.goodsId)" />
        </template>
    </van-swipe-cell>
</div>
<slot />
</template>

<script lang="ts">
import {
    onMounted,
    reactive,
    toRefs,
    watch,
    computed
} from "vue";
import {
    useStore
} from "vuex";
import {
    UserMutations
} from "../store/mutation-types";
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
        name: {
            type: Number,
            default: 0,
        },
    },
    setup(props, ctx) {
        const state = reactive({
            checked: true,
            value: props.detail.goodsNum,
        });

        const store = useStore();

        const price = computed(() =>
            (props.detail.goodsNum * props.detail.originalPrice).toFixed(2)
        );

        watch(
            () => state.checked,
            (newVal: boolean) => {
                store.commit(UserMutations.SET_CHECKED, {
                    goodsId: props.detail.goodsId,
                    checked: newVal,
                });
            }
        );

        watch(
            () => state.value,
            (newVal: number, oldVal: number) => {
                if (newVal - oldVal > 0) {
                    store.commit(UserMutations.SET_GOODS, {
                        ...props.detail,
                        goodsNum: newVal,
                        type: "add",
                    });
                } else {
                    store.commit(UserMutations.SET_GOODS, {
                        ...props.detail,
                        goodsNum: newVal,
                        type: "reduce",
                    });
                }
            }
        );

        const onDelete = (id: number) => {
            store.commit(UserMutations.DEL_GOODS, id);
        };

        return {
            ...toRefs(state),
            price,
            onDelete,
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
