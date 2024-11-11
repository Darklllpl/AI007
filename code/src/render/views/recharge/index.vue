<template>
    <div class="container">
        <div class="header">
            <span class="title">充值</span>
            <button class="close-button" @click="goAIchat">
                <img src="../../assets/img/login/setpasswordclose.png" alt="关闭" class="close-icon" />
            </button>
        </div>
    </div>

</template>
  
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goAIchat = () => {
  router.push("/AIchat");
};
</script>
  
<style lang="scss" scoped>

</style>
  