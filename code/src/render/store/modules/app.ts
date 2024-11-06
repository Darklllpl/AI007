// stores/app.ts
import { defineStore } from "pinia";
import { useCache } from "@/render/hooks/useCache";

const { wsCache } = useCache("localStorage");

interface AppState {
  isDark: Boolean;
}
export interface BreadCrumbList {
  title: String;
  path: String;
  showClose: Boolean;
  type: String;
}
export type ActionBread = "route" | "news";

export const useAppStore = defineStore("app", {
  state: (): AppState => {
    return {
      isDark: wsCache.get("isDark") ? wsCache.get("isDark") : false,
    };
  },
  actions: {
    // 设置主题切换
    setDark() {
      this.isDark = !this.isDark;
      wsCache.set("isDark", this.isDark);
    },
  },
});
