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

export interface CategoriesData {
  categoryId: number;
  categoryLevel: number;
  categoryName: string;
  parentId: number;
  secondLevelCategoryVOS: CategoriesData[];
}

export interface UserInfoData {
  introduceSign: string;
  loginName: string;
  nickName: string;
}

export interface GoodsDetailData {
  goodsCarouselList: string[];
  goodsCoverImg: string;
  goodsDetailContent: string;
  goodsId: number;
  goodsIntro: string;
  goodsName: string;
  originalPrice: number;
  sellingPrice: number;
  tag: string;
}

export interface SearchData {
  currPage: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;
  list: GoodsData[];
}
