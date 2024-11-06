<template>
  <!--  <TopHeader />-->
  <div class="wraper-container-no-drag">
    <div class="layout-container">
      <Siderbar></Siderbar>
      <div class="layout-right">
        <AppMain />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Siderbar from "@/render/layout/Sidebar.vue";
import AppMain from "@/render/layout/AppMain.vue";
import { useAppStore } from "@/render/store/modules/app";
import { watchTheme } from "@/render/hooks/watchTheme";
const appStore = useAppStore();
const isCollapse = computed(() => {
  return appStore.isCollapse;
});
watchTheme();
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  width: 100%;
  height: 100vh;

  .layout-right {
    flex: 1;
    height: 100vh;
    background: #fff;
  }
}
</style>
