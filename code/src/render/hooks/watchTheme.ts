import { computed, watchEffect } from "vue";
import { useAppStore } from "@/render/store/modules/app";
export const watchTheme = () => {
  const appStore = useAppStore();
  let isDark = computed(() => {
    return appStore.isDark;
  });
  watchEffect(() => {
    if (isDark.value) {
      document.body.className = "dark";
      // document.documentElement.style.setProperty('--dark-bg-color','red')
    } else {
      document.body.className = "";
      // document.documentElement.style.setProperty('--dark-bg-color','red')
    }
  });
};
