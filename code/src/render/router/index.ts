import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import type { App } from "vue";

export const constantRouterMap: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/render/layout/index.vue"),
    children: [
      {
        path: "/",
        name: "Welcome",
        meta: {
          title: "首页",
        },
        component: () => import("@/render/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      hidden: true,
    },
    component: () => import("@/render/views/login/index.vue"),
  },
];
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
