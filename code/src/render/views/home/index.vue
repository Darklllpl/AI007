<template>
  <div class="">
    <el-button type="primary" @click="onclick">登录</el-button>
    <div>
      <el-button type="primary" @click="onBrowser">打开浏览器</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOpenByBrowser } from "@/render/hooks/useOpenByBrowser";
import { useRouter } from "vue-router";
const router = useRouter();

const { openByBrowser } = useOpenByBrowser();

const onclick = () => {
  router.push("/login");
};

const onBrowser = () => {
  openByBrowser("https://www.baidu.com");
};
</script>

<style scoped></style>
