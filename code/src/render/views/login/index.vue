<template>
  <div class="login-container">
    <div>
      <button @click="onLogin">login</button>
    </div>
    <div @click="goHome">home</div>
  </div>
</template>

<script setup lang="ts">
import { login } from "@/render/api/login";
import { useRouter } from "vue-router";

const router = useRouter();
const goHome = () => {
  router.push("/");
};

const onLogin = () => {
  login({ name: "", password: "" }).then((res) => {
    console.log("res.data.token", res.data.token);
  });
};
</script>

<style lang="scss" scoped></style>
