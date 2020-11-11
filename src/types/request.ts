export interface AddAddressParams {
  userName: string;
  userPhone: number;
  provinceName: string;
  cityName: string;
  regionName: string;
  detailAddress: string;
  defaultFlag: 1 | 0;
}

export interface CartParams {
  cartItemId: string;
  goodsCount: string;
}

export interface AddCartParams {
  goodsCount: number;
  goodsId: number;
}

export interface SearchParams {
  pageNumber: number;
  goodsCategoryId: string;
  keyword: string;
  orderBy: number;
}

export interface CreateOrderParams {
  addressId: string;
  cartItemIds: string;
}

export interface OrderListParams {
  pageNumber: number;
  status: string;
}

export interface PayOrderParams {
  orderNo: string;
  payType: string;
}

export interface EditUserInfoParams {
  introduceSign: string;
  nickName: string;
  passwordMd5?: string;
}

export interface LoginParams {
  loginName: string;
  passwordMd5: string;
}

export interface RegisterParams {
  loginName: string;
  password: string;
}
