<template>
  <div class="container">
    <div class="header">
      <span class="title">设置密码</span>
      <button class="close-button" @click="closeModal">
        <img src="../../assets/img/login/setpasswordclose.png" alt="关闭" class="close-icon" />
      </button>

    </div>

    <div class="instruction">请设置密码</div>

    <div class="input-container">
      <input
        v-model="password"
        :type="isPasswordVisible ? 'text' : 'password'"
        class="codeinput-box"
        placeholder="请输入密码"
      />
      <button @click="togglePasswordVisibility" class="toggle-button">
        <img v-if="isPasswordVisible" src="../../assets/img/login/show.png" alt="显示密码" />
        <img v-else src="../../assets/img/login/hide.png" alt="隐藏密码" />
      </button>
    </div>

    <div class="length-tip">注：密码长度不得少于6位</div>

    <div class="reinstruction">请再次输入密码</div>

    <div class="reinput-container">
      <input
        v-model="password1"
        :type="isPasswordVisible1 ? 'text' : 'password'"
        class="codeinput-box"
        placeholder="请再次输入密码"
      />
      <button @click="togglePasswordVisibility1" class="toggle-button">
        <img v-if="isPasswordVisible1" src="../../assets/img/login/show.png" alt="显示密码" />
        <img v-else src="../../assets/img/login/hide.png" alt="隐藏密码" />
      </button>
    </div>

    <div class="errortext" style="display: none;">两次输入的密码不一致</div>

    <div class="button-container">
      <button @click="submitPassword" class="submit-button">开始使用</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();
const password = ref('');
const password1 = ref('');
const isPasswordVisible = ref(false);  // 控制密码显示状态
const isPasswordVisible1 = ref(false);  // 控制密码显示状态

function closeModal() {
    router.push("/");
}

function submitPassword() {
    // 检查两个密码输入框内容是否一致
    if (password.value !== password1.value) {
        document.querySelector('.errortext').style.display = 'block'; // 显示错误文本
    } else {
        document.querySelector('.errortext').style.display = 'none'; // 隐藏错误文本
        // 进行下一步操作
        console.log("密码一致，进行下一步操作");
    }
}

// 切换密码可见状态
function togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value;
}

// 切换密码可见状态
function togglePasswordVisibility1() {
    isPasswordVisible1.value = !isPasswordVisible1.value;
}
</script>
  
  <style lang="scss" scoped>
  .container {
    background-color: #FFFFFF;
    border-radius: 4px;
    width: 313px;
    height: 335px;
  }
  
  .header {
    display: flex;
    position: absolute;
    top: 16px;
    width: 350px;
    height: 28px;
  }
  
  .title {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    position: absolute;
    left: 114px;
  }
  
  .close-button {
    background: none;
    border: none;
    color: #1E223C;
    cursor: pointer;
    font-size: 14px;
    position: absolute;
    left: 273px;
  }

  .close-icon {
    width: 24px; /* 设置图标宽度 */
    height: 24px; /* 设置图标高度 */
}
  
  .instruction {
    font-size: 14px;
    color: #1E223C;
    line-height: 19.6px;
    font-weight: 400;
    position: absolute;
    left: 16px;
    top: 68px;
  }
  
  .input-group {
    width: 282px;
    height: 33px;
  }
  
.input-container {
    position: absolute; /* 为输入框创建一个相对定位的容器 */
    top: 100px;
    left: 16px;
}
.codeinput-box{
  width: 282px; /* 设置文本框宽度 */
  height: 33px; /* 设置文本框高度 */
  border-radius: 4px;
  border: 1px solid #C6CFDC;
  flex-grow: 1;
  padding-right: 40px;
}
.toggle-button {
    position: absolute; /* 绝对定位按钮 */
    right: 16px; /* 距离右侧10px */
    top: 50%; /* 垂直居中 */
    transform: translateY(-50%); /* 向上移动50%高度 */
    background: none; /* 去掉按钮背景 */
    border: none; /* 去掉按钮边框 */
    cursor: pointer; /* 变为手型光标 */
}
.codeinput-box::placeholder{
  font-size: 12px; /* 设置 placeholder 文字大小 */
    color: #A7B5C9; /* 可选：设置 placeholder 文字颜色 */
    position: relative;
    left: 16px;
    line-height: 16.8px;
    font-weight: 400;
}

.length-tip{
font-family: PingFang SC;
font-size: 12px;
font-weight: 400;
line-height: 16.8px;
position: absolute;
top: 137px;
left: 16px;
opacity: 0.7;
}

.reinstruction{
  font-size: 14px;
    color: #1E223C;
    line-height: 19.6px;
    font-weight: 400;
    position: absolute;
    left: 16px;
    top: 170px;
}

.reinput-container{
  position: absolute; /* 为输入框创建一个相对定位的容器 */
    top: 202px;
    left: 16px;
}

.errortext{
  font-family: PingFang SC;
  font-size: 12px;
  font-weight: 400;
  line-height: 16.8px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #F53126;
  position: absolute;
  top: 239px;
  left: 16px;
}

.button-container {
  position: absolute;
  top: 286px;
  left: 16px;
}

.submit-button {
  border: none;
  border-radius: 4px;
  background-color: #5CA9F9;
  width: 281px;
  height: 33px;
  color: white;
  font-size: 12px;
  font-family: PingFang SC;
font-weight: 600;
line-height: 16.8px;
  cursor: pointer;
}

  </style>
  