import { createStore } from "vuex";
import { UserMutations } from "./mutation-types";

interface StateType {
  token: string | null;
  goods: {
    goodsCoverImg: string;
    goodsId: number;
    goodsName: string;
    originalPrice: number;
    goodsNum: number;
    checked: boolean;
  }[];
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
    [UserMutations.SET_GOODS](
      state: StateType,
      good: {
        goodsCoverImg: string;
        goodsId: number;
        goodsName: string;
        originalPrice: number;
        goodsNum: number;
      }
    ) {
      const hasGood = state.goods.findIndex(item => item.goodsId === good.goodsId);
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
