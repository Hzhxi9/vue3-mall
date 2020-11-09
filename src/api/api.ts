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
