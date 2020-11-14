import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Mine from "../views/Mine.vue";
import Categories from "../views/Categories.vue";
import Login from "../views/Login.vue";
import User from "../views/User.vue";
import GoodDetail from "../views/GoodDetail.vue";
import Search from "../views/Search.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/mine",
    name: "Mine",
    component: Mine,
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/good-detail",
    name: "GoodDetail",
    component: GoodDetail,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
