import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import ShopPage from "../pages/ShopPage.vue";
import CartPage from "../pages/CartPage.vue";
import OrderPage from "../pages/OrderPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/shop", component: ShopPage },
  { path: "/cart", component: CartPage },
   { path: "/orders", component: OrderPage }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
