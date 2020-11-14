import { createStore } from "vuex";
import { UserMutations } from "./mutation-types";

interface StateType {
  token: string | null;
  goods: GoodType[];
}

export interface GoodType {
  goodsCoverImg: string;
  goodsId: number;
  goodsName: string;
  originalPrice: number;
  goodsNum: number;
  checked: boolean;
}

const store = createStore({
  state: {
    token: null,
    goods: [],
  },
  mutations: {
    [UserMutations.SET_TOKEN](state: StateType, token: string | null) {
      state.token = token;
    },
    [UserMutations.SET_CHECKED](
      state: StateType,
      goods: {
        goodsId: number;
        checked: boolean;
      }
    ) {
      const { goodsId, checked } = goods;
      const index = state.goods.findIndex((item) => item.goodsId === goodsId);
      state.goods[index].checked = checked;
      console.log(state.goods, "state.goods");
    },
    [UserMutations.SET_ALLCHECKED](state: StateType, checked: boolean) {
      state.goods.forEach((item) => (item.checked = checked));
      console.log("state.goods", state.goods);
    },
    [UserMutations.DEL_GOODS](state: StateType, goodsId: number) {
      const index = state.goods.findIndex((item) => item.goodsId === goodsId);
      state.goods.splice(index, 1);
      console.log("state", state.goods);
    },
    [UserMutations.SET_GOODS](
      state: StateType,
      good: {
        goodsCoverImg: string;
        goodsId: number;
        goodsName: string;
        originalPrice: number;
        goodsNum: number;
        type: string;
      }
    ) {
      const hasGood = state.goods.findIndex((item) => item.goodsId === good.goodsId);
      switch (good.type) {
        case "add":
          if (hasGood === -1) {
            const { goodsCoverImg, goodsId, goodsName, originalPrice } = good;
            state.goods.push({
              goodsCoverImg,
              goodsId,
              goodsName,
              originalPrice,
              goodsNum: 1,
              checked: true,
            });
          } else {
            let goodsNum = state.goods[hasGood].goodsNum + 1;
            console.log(goodsNum, "goodsNum");
            state.goods[hasGood].goodsNum = goodsNum;
          }
          break;
        case "reduce":
          let goodsNum = state.goods[hasGood].goodsNum - 1;
          console.log(goodsNum, "goodsNum");
          state.goods[hasGood].goodsNum = goodsNum;
          break;
      }

      console.log(state.goods, "state.goods");
    },
  },
  actions: {},
  getters: {
    token: (state: { token: string | null }) => state.token,
    goods: (state: {
      goods: {
        goodsCoverImg: string;
        goodsId: number;
        goodsName: string;
        originalPrice: number;
        goodsNum: number;
      }[];
    }) => state.goods,
  },
});

export default store;
