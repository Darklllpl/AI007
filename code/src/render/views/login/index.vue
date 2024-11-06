<template>
  <div class="login-container">
    <div class="titlebar-container">
      <div class="buttongroup-container">
        <div class="home-link" @click="goHome">
          <img src="../../assets/img/login/home-icon.png" alt="Home"/>
        </div>
        <div class="home-link" @click="goHome">
          <img src="../../assets/img/login/minimise-icon.png" alt="Minimise"/>
        </div>
        <div class="home-link" @click="goHome">
          <img src="../../assets/img/login/fullscreen-icon.png" alt="Fullscreen"/>
        </div>
      </div>
    </div>

    <div class="titletext-container">
      <div class="titletext">伊利亚</div>
    </div>

    <div class="loginfunction-container">
      <div class="phonenumber-box">
        <div class="phonenumber-pre">
          <select>
            <option value="+86">+86</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
        </div>
        <div class="phonenumberinput">
          <input type="tel" class="phone-input" placeholder="请输入手机号" />
        </div>
      </div>
      <div class="slider-box">
        <div class="slider" :style="{ left: `${sliderPosition}px` }" @mousedown="onMouseDown">
          <span class="arrow">》</span>
        </div>
        <span id="slider-text" class="slider-text">{{ sliderText }}</span>
      </div>

      <div class="verification-box">
        <input type="text" class="input-box" placeholder="短信验证码">
        <button class="get-code-button">获取验证码</button>
      </div>


      <div class="loginbutton-box">
        <button @click="onLogin" class="login-button">登 录</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login } from "@/render/api/login";
import { useRouter } from "vue-router";
import { ref } from 'vue';

const router = useRouter();
const sliderPosition = ref(0);
const sliderText = ref('按住滑块，拖到最右边');

// 跳转到主页的函数
const goHome = () => {
  router.push("/");
};

// 登录函数
const onLogin = () => {
  login({ name: "", password: "" }).then((res) => {
    console.log("res.data.token", res.data.token);
  });
};

// 鼠标按下事件
const onMouseDown = (event: MouseEvent) => {
  const startX = event.clientX; 
  const sliderBox = event.currentTarget.parentElement as HTMLElement; // 获取滑块区域容器
  const sliderWidth = sliderBox.clientWidth;
  const initialPosition = sliderPosition.value;

  const onMouseMove = (moveEvent: MouseEvent) => {
    const currentX = moveEvent.clientX;
    let newPosition = initialPosition + (currentX - startX); // 计算新的滑块位置

    // 限制滑块位置
    if (newPosition < 0) newPosition = 0;
    if (newPosition > sliderWidth - 29) newPosition = sliderWidth - 29;

    sliderPosition.value = newPosition; 

    // 更新滑块区域背景颜色
    sliderBox.style.background = 'linear-gradient(to right, #FFFFFF ' + newPosition + 'px, #E7E9E8 ' + newPosition + 'px)';

    // 更新提示文字
    if (newPosition >= sliderWidth - 29) {
      sliderText.value = '验证通过';
    } else {
      sliderText.value = '按住滑块，拖到最后边';
    }
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    sliderBox.style.background = '#E7E9E8'; // 还原背景颜色
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
</script>

<style lang="scss" scoped>
.login-container {
  background-image: url('../../assets/img/login/background.png'); /* 设置背景图片路径 */
  background-size: 264px 264px; /* 设置背景图片大小 */
  background-repeat: no-repeat; /* 不重复背景图片 */
  background-position: top center; /* 图片位于顶部居中对齐 */
  width: 333px;
  height: 500px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.titlebar-container {
  width: 330px;
  height: 28px;
}

.buttongroup-container {
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  top: 8px;
  left: 8px;
  width: 52px;
  height: 12px;
}

.home-link {
  cursor: pointer;
}

.home-link img {
  width: 12px;
  height: 12px;
}

.titletext-container {
  width: 100%;
  height: 42px;
  display: flex; 
  justify-content: center;
  align-items: center; 
  margin-top: 15px;
}

.titletext {
  font-family: AliHYAiHei-Beta;
  font-size: 32px;
  font-weight: 400;
  line-height: 42.46px;
  text-align: left;
}

.loginfunction-container {
  width: 282px;
  height: 217px;
  position: absolute;
  top: 148px;
  left: 24px;
}

.phonenumber-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  bottom: 8px;
  border: 1px solid #C6CFDC;
  border-radius: 4px;
}

.phonenumber-pre {
  width: 56px;
  height: 33px;
}

.phonenumber-pre select {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 4px 0px 0px 4px;
}

.phonenumberinput {
  width: 226px;
  height: 33px;
}
.phone-input {
    width: 100%; /* 使输入框宽度适应父容器 */
    height: 33px; /* 设置输入框高度 */
}

.phone-input::placeholder {
    font-size: 12px; /* 设置占位符字体大小 */
    color: #A7B5C9; /* 可选：设置占位符颜色 */
    position: relative;
    left: 16px;
}

.phonenumberinput input {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 0px 4px 4px 0px;
  box-sizing: border-box;
}

.slider-box {
  width: 282px;
  height: 33px;
  background: #E7E9E8;
  position: absolute;
  border-radius: 4px;
  display: flex;
  align-items: center;
  overflow: hidden;
  top: 49px;
  border: 1px solid #C6CFDC;
  border-radius: 4px;
}

.slider {
  width: 29px;
  height: 31px;
  background: #FFFFFF;
  position: absolute;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #C6CFDC;
}

.arrow {
  font-size: 20px;
  color: #1E223C;
}

.slider-text {
  color: #1E223C;
  font-size: 12px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.verification-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
  top:98px;
}
.input-box {
    width: 182px; /* 设置文本框宽度 */
    height: 33px; /* 设置文本框高度 */
    margin-right: 8px; /* 设置与按钮之间的间距 */
    border-radius: 4px;
    border: 1px solid #C6CFDC;
}

.input-box::placeholder {
    font-size: 12px; /* 设置 placeholder 文字大小 */
    color: #A7B5C9; /* 可选：设置 placeholder 文字颜色 */
    position: relative;
    left: 16px;
    line-height: 16.8px;
    font-weight: 400;
}

.get-code-button {
    width: 92px; /* 设置按钮宽度 */
    height: 33px; /* 设置按钮高度 */
    border-radius: 4px;
    border: 1px solid #C6CFDC;
    background-color: #FFFFFF;
}

.loginbutton-box{
  position: absolute;
  top:155px;
  display: flex; /* 使用弹性布局 */
  justify-content: center; /* 居中对齐 */
}

.login-button {
    width: 282px; /* 设置按钮宽度 */
    height: 33px; /* 设置按钮高度 */
    font-size: 12px; /* 设置字体大小 */
    font-family: 'Arial', sans-serif; /* 设置字体类型 */
    font-weight: 600; /* 设置字体加粗 */
    color: #FFFFFF; /* 设置字体颜色 */
    background-color: #5CA9F9; /* 设置按钮背景色 */
    border: none; /* 去掉按钮边框 */
    border-radius: 4px; /* 设置圆角 */
    cursor: pointer; /* 鼠标悬停时显示为可点击 */
    line-height: 16.8px;
}
</style>
