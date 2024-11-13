<template>
  <div class="">
    <el-button type="primary" @click="onclick">登录</el-button>
    <div>
      <el-button type="primary" @click="onBrowser">打开浏览器</el-button>
    </div>
    <div>
      <el-button type="primary" @click="onsetPassword">打开设置密码</el-button>
    </div>
    <div>
      <el-button type="primary" @click="onAIchat">打开AI聊天</el-button>
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

const onsetPassword = () => {
  router.push("/setPassword");
};

const onAIchat = () => {
  router.push("/AIchat");
};
</script>

<style scoped></style>
