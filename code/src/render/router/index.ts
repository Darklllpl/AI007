import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import type { App } from "vue";
import AIchat from "@/render/views/AIchat/index.vue";
import recharge from "@/render/views/recharge/index.vue"

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
  // 添加设置密码的路径
  {
    path: "/setPassword",
    name: "SetPassword",
    meta: {
      title: "设置密码",
    },
    component: () => import("@/render/views/setPassword/index.vue"), // 请确保此路径存在
  },
  // 添加AI聊天的路径
  {
    path: "/AIchat",
    name: "AIchat",
    meta: {
      title: "AI聊天",
    },
    component: AIchat, // 使用静态导入
  },
  //添加充值的路径
  {
    path: "/recharge",
    name: "recharge",
    meta: {
      title: "充值",
    },
    component: recharge, // 使用静态导入
  }
];

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
