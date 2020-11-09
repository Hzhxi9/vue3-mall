import request from "../utils/request";

// Home
export function getHome() {
  return request({
    url: "/index-infos",
    params: "GET",
  });
}

// Goods
export function getDetail(params: { id: number }) {
  return request({
    url: "/goods/detail",
    method: "GET",
    params,
  });
}

export function getCategory() {
  return request({
    url: "/categories",
    params: "GET",
  });
}

export function search(params: { id: number }) {
  return request({
    url: "/search",
    method: "GET",
    params,
  });
}

// Cart
export function addCart(data: { id: number }) {
  return request({
    url: "/shop-cart",
    method: "POST",
    data,
  });
}

export function modifyCart(data: { id: number }) {
  return request({
    url: "/shop-cart",
    method: "PUT",
    data,
  });
}

export function getCart(params: { id: number }) {
  return request({
    url: "/shop-cart",
    method: "GET",
    params,
  });
}

export function deleteCartItem(data: { id: number }) {
  return request({
    url: "/shop-cart",
    method: "DELETE",
    data,
  });
}

export function getByCartItemIds(params: { id: number }) {
  return request({
    url: "/shop-cart/settle",
    method: "GET",
    params,
  });
}

// Address
export function addAddress(data: any) {
  return request({
    url: "/address",
    method: "POST",
    data,
  });
}

export function editAddress(data: any) {
  return request({
    url: "/address",
    method: "PUT",
    data,
  });
}

export function deleteAddress(params: { id: number }) {
  return request({
    url: "/address",
    method: "DELETE",
    params,
  });
}

export function getDefaultAddress() {
  return request({
    url: "/address/default",
    method: "GET",
  });
}

export function getAddressList(params: {
  pageNumber: number;
  pageSize: number;
}) {
  return request({
    url: "/address",
    method: "GET",
    params,
  });
}

export function getAddressDetail(params: { id: number }) {
  return request({
    url: "/address",
    method: "GET",
    params,
  });
}

// User
export function getUserInfo() {
  return request({
    url: "/user/info",
    method: "GET",
  });
}

export function editUserInfo(data: any) {
  return request({
    url: "/user/info",
    method: "PUT",
    data,
  });
}

export function login(data: any) {
  return request({
    url: "/user/login",
    method: "POST",
    data,
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "POST",
  });
}

export function register(data: any) {
  return request({
    url: "/user/register",
    method: "POST",
    data,
  });
}

// Order
export function createOreder(data: any) {
  return request({
    url: "/saveOrder",
    method: "POST",
    data,
  });
}

export function getOrderList(params: any) {
  return request({
    url: "/order",
    method: "GET",
    params,
  });
}

export function getOrderDetail(params: { id: number }) {
  return request({
    url: "/order",
    method: "GET",
    params,
  });
}

export function cancelOrder(params: { id: number }) {
  return request({
    url: `/order/${params.id}/cancel`,
    method: "PUT",
  });
}

export function confirmOrder(params: { id: number }) {
  return request({
    url: `/order/${params.id}/finish`,
    method: "PUT",
  });
}

export function payOrder(params: any) {
  return request({
    url: "/paySuccess",
    method: "GET",
    params,
  });
}
