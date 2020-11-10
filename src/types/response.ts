export interface HomeResponse {
  carousels: CarouselsData[];
  hotGoodses: GoodsData[];
  newGoodses: GoodsData[];
  recommendGoodses: GoodsData[];
}

export interface CarouselsData {
  carouselUrl: string;
  redirectUrl: string;
}

export interface GoodsData {
  goodsCoverImg: string;
  goodsId: number;
  goodsIntro: string;
  goodsName: string;
  sellingPrice: number;
  tag: string;
}