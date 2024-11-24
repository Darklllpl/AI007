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

    <div class="error-box">
      <div v-if="errorStatus != null" class="errorstatus">
          <img src="../../assets/img/login/error-icon.png" alt="错误提示" class="error-icon"> {{tipsmsg}}
      </div>
      <div v-if="rightStatus != null" class="rightstatus">
        <img src="../../assets/img/login/greentick.png" alt="发送提示" class="greentick"> {{tipsmsg}}
      </div>
    </div>


    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
          <p class="modaltext1">服务协议及隐私保护</p>
          <p class="modaltext2">为更好的保护您的合法权益</p>
          <span class="modaltext3">请阅读并同意
            <span class="links1">
              <a href="服务协议链接" class="link1">服务协议</a>
              和
              <a href="隐私权政策链接" class="link1">隐私权政策</a>
            </span>
          </span>

          <div class="modalbutton-container">
              <button @click="closeModal" class="modalbutton1">不同意</button>
              <button @click="closeModal1" class="modalbutton2">同意</button>
          </div>
      </div>
    </div>


    <div class="loginfunction-container">
      <div class="phonenumber-box" :class="{ 'error-border': errorStatus === 1 || errorStatus === 3 }">
        <div class="phonenumber-pre" :class="{ 'error-border': errorStatus === 1 || errorStatus === 3 }">
          <select :class="{ 'error-border': errorStatus === 1 }">
            <option value="+86">+86</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
        </div>
        <div class="phonenumberinput">
          <input type="tel" v-model="phoneNumber" class="phone-input" placeholder="请输入手机号" />
        </div>
      </div>


      <div class="slider-box">
        <div class="slider" :style="{ left: `${sliderPosition}px` }" @mousedown="onMouseDown">
            <img v-if="isRight" src="../../assets/img/login/arrow.png" alt="箭头" class="arrow" />
            <img v-if="!isRight" src="../../assets/img/login/greenarrow.png" alt="绿箭头" class="greenarrow" />
        </div>
        <span id="slider-text" class="slider-text" :style="{ color: sliderTextColor }">{{ sliderText }}</span>
      </div>

      <!-- 显示或隐藏验证码输入框 -->
      <div v-if="showVerificationBox" class="verification-box">
        <input 
          type="text" 
          class="input-box" 
          :class="{ 'error-border': errorStatus === 1 || errorStatus === 2 }" 
          placeholder="短信验证码" 
          v-model="verificationCode">
        <button 
            class="get-code-button" 
            :disabled="isCounting || !isVerified"
            @click="GetVerificationCode">
            {{ buttonText }} 
        </button>
      </div>


      <!-- 显示或隐藏密码输入框 -->
      <div v-else class="secretcode-box">
        <div class="input-container">
          <input
            v-model="password"
            :type="isPasswordVisible ? 'text' : 'password'"
            class="codeinput-box"
            :class="{ 'error-border': errorStatus === 3 }"
            placeholder="请输入密码"
          />
          <button @click="togglePasswordVisibility" class="toggle-button">
            <img v-if="isPasswordVisible" src="../../assets/img/login/show.png" alt="显示密码" />
            <img v-else src="../../assets/img/login/hide.png" alt="隐藏密码" />
          </button>
        </div>
      </div>

      <div class="loginbutton-box">
        <button @click="Login" class="login-button">登 录</button>
      </div>

      <div class="private-box">
        <img
          v-if="isFirstImage"
          id="toggleCircle"
          class="circle"
          src="../../assets/img/login/circle1.png"
          alt="圆圈"
          @click="toggleImage"
        />
        <img
          v-else
          id="toggleCircle"
          class="circle"
          src="../../assets/img/login/circle2.png"
          alt="圆圈"
          @click="toggleImage"
        />
        <span class="agreement-text">登录表示您已阅读并同意</span>
        <span class="links">
          <a href="服务协议链接" class="link">服务协议</a> |
          <a href="隐私权政策链接" class="link">隐私权政策</a>
        </span>
      </div>

      <div class="loginmethod-container">
        <div class="longinwaytext-box">
          <div class="line"></div>
          <span class="other-login-text">其他登录方式</span>
          <div class="line"></div>
        </div>
        <div class="longinwaybutton-box">
          <button class="custom-button" @click="toggleLoginMethod">
            <img src="../../assets/img/login/key.png" alt="验证码图标" class="icon" />
            {{ showVerificationBox ? '密码登录' : '验证码登录' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login,getVerificationCode } from "@/render/api/login";
import { useRouter } from "vue-router";
import { ref } from 'vue';
import axios from "axios";

const router = useRouter();
const sliderPosition = ref(0);
const sliderText = ref('按住滑块，拖到最右边');

// 跳转到主页的函数
const goHome = () => {
  router.push("/");
};

const errorStatus = ref(null); // 存储错误码
const tipsmsg = ref(null);// 存储提示信息
const rightStatus = ref(null);//存储正常码
const phoneNumber = ref(''); // 存储手机号
const verificationCode = ref(''); // 存储验证码
const password = ref('');  // 绑定密码输入框的值
const isFirstImage = ref(true); // 控制当前显示的图片
const isRight=ref(true)
const showVerificationBox = ref(true); // 默认显示验证码输入框
const isPasswordVisible = ref(false);  // 控制密码显示状态
const showModal = ref(false); // 定义 showModal 变量
const isCounting = ref(false); // 倒计时状态
const countdown = ref(60); // 倒计时初始值
const buttonText = ref('获取验证码'); // 按钮文字
const isVerified = ref(false); // 控制验证通过状态
const sliderTextColor = ref('#1E223C'); // 初始化文字颜色

//登录函数
const Login = async () => {
  if (isFirstImage.value) {
    showModal.value = true;
    return;
  }

  const data = {
    loginType: showVerificationBox.value ? '1' : '2',
    phone: phoneNumber.value,
    verificationCode: showVerificationBox.value ? verificationCode.value : "666666",
    password: !showVerificationBox.value ? password.value : "666666"
  };

  if (!phoneNumber.value || (!verificationCode.value && !password.value)) {
    console.error('参数不能为空');
    return;
  }

  try {
    const response = await axios.post('https://api.eliya.fun/userLogin/login', null, {
      params: data // 将参数放入请求的查询字符串
    });

    console.log(response.data)
    if (response.data.code === 200) {
      const token=response.data.data.token;
      // 设置请求头
      const headers = {
        Authorization: `Bearer ${token}`, // 替换为你的 token
      };
      if(response.data.data.isFirstLogin=== true){
        router.push("/setPassword")
      } else{
        router.push("/AIchat");
      }
    }else if(response.data.code === 500){
      rightStatus.value=null;
      tipsmsg.value=response.data.msg;
      if(response.data.msg==='验证码输入有误'){
        errorStatus.value=2;
      }else if(response.data.msg==='验证码过期'){
        errorStatus.value=1;
      }else if(response.data.msg==='密码错误'){
        errorStatus.value=3;
      }
    }
  } catch (error) {
    console.error('登录失败:', error.response ? error.response.data : error.message);
  }
};


function closeModal(){
  showModal.value = false;
}
function closeModal1(){
  showModal.value = false;
  toggleImage();
}

// 鼠标按下事件
const onMouseDown = (event: MouseEvent) => {
  event.preventDefault(); // 阻止默认行为
  const startX = event.clientX;
  const sliderBox = event.currentTarget.parentElement as HTMLElement; // 获取滑块区域容器
  const sliderWidth = sliderBox.clientWidth;
  const initialPosition = sliderPosition.value;

  const onMouseMove = (moveEvent: MouseEvent) => {
    const currentX = moveEvent.clientX;

    // 判断滑块是否已经到达最右边
    if (sliderPosition.value >= sliderWidth - 29) {
      return; // 若已到达，则不再处理拖动
    }

    let newPosition = initialPosition + (currentX - startX); // 计算新的滑块位置

    // 限制滑块位置
    if (newPosition < 0) newPosition = 0;
    if (newPosition > sliderWidth - 29) newPosition = sliderWidth - 29; // 29是滑块的宽度

    sliderPosition.value = newPosition;

    // 更新滑块区域背景颜色
    const backgroundColor = newPosition >= sliderWidth - 29 ? '#FFFFFF' : '#E7E9E8';
    sliderBox.style.background = 'linear-gradient(to right, #FFFFFF ' + newPosition + 'px, ' + backgroundColor + ' ' + newPosition + 'px)';

    // 更新提示文字
    if (newPosition >= sliderWidth - 29) {
        sliderText.value = '验证通过';
        sliderTextColor.value = '#00B978'; // 设置文字颜色为绿色
        isVerified.value = true; // 设置验证通过状态
        toggleImage2();
    } else {
        sliderText.value = '按住滑块，拖到最后边';
        sliderTextColor.value = '#1E223C'; // 恢复默认颜色
        isVerified.value = false; // 设置为未通过状态
    }
  };

  const onMouseUp = () => {
    // 判断滑块是否到达最右边
    if (sliderPosition.value < sliderWidth - 29) {
      sliderPosition.value = 0; // 若未到达最右边，则滑块返回起点
      sliderBox.style.background = '#E7E9E8'; // 还原背景颜色
      sliderText.value = '按住滑块，拖到最后边'; // 重置提示文字
      sliderTextColor.value = '#1E223C'; // 恢复默认颜色
      isVerified.value = false; // 设置为未通过状态
    } else {
      // 到达最右边
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      return; // 结束拖动
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};


// 获取验证码
async function GetVerificationCode() {
  if (!isVerified.value) {
    return; // 如果未验证通过，则不执行获取验证码逻辑
  }
  
  const data = {
    phone: phoneNumber.value
  };

  // 发送验证码请求，构造查询参数
  const response = await axios.get(`https://api.eliya.fun/userLogin/getVerificationCode`, { 
    params: data    // 将 data 作为查询参数传递
  });
  
  // 定义 response 返回的数据格式
  if (response.data.code===200) {
    // 显示验证码发送成功的提示
    rightStatus.value = true;
    tipsmsg.value=response.data.msg;

    //按钮倒计时
    isCounting.value = true;
    countdown.value = 60; // 初始化倒计时为60秒
    updateButtonText(); // 更新按钮文本

    const timer = setInterval(() => {
      countdown.value--;
      updateButtonText(); // 更新按钮文本

      if (countdown.value === 0) {
        clearInterval(timer);
        isCounting.value = false;
        buttonText.value = '获取验证码'; // 倒计时结束后恢复文本
      }
    }, 1000);
  } else if(response.data.code===500){
    errorStatus.value=3;
    tipsmsg.value=response.data.msg;
  }

  // 设置5秒钟后隐藏提示
  setTimeout(() => {
    rightStatus.value = null; // 隐藏提示
    errorStatus.value = null; // 隐藏提示
  }, 5000);
}



// 更新按钮文本
function updateButtonText() {
  buttonText.value = isCounting.value ? `重新获取(${countdown.value}s)` : '获取验证码';
}


// 切换验证码和密码登录方式
function toggleLoginMethod() {
  showVerificationBox.value = !showVerificationBox.value; // 切换显示状态
}

// 切换图片状态
function toggleImage() {
    isFirstImage.value = !isFirstImage.value;
}

function toggleImage2(){
  isRight.value = !isRight.value;
}

// 切换密码可见状态
function togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value;
}
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

.error-box {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: flex-start; /* 垂直对齐（根据需要调整） */
  height: 25px; /* 设置父容器的高度以便居中 */
}

.errorstatus, .rightstatus {
    margin-top: 30px;
    min-width: 108px; /* 最小宽度 */
    max-width: 300px; /* 可选：设置最大宽度避免过宽 */
    height: 25px; /* 高度自适应内容 */
    text-align: center; /* 文本居中对齐 */
    background-color: #FFFFFF;
    border-radius: 4px;
    font-size: 12px;
    display: flex; /* 使用 Flexbox */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    box-shadow: 0px 2px 12.5px 0px #0000001C;
    padding-left: 8px;
    padding-right: 8px;
}
.errorstatus {
    border: none;
    color: #F53126;
}
.rightstatus {
    border: 1px solid #C6CFDC;
    color: #00B978;
}
.error-icon {
    width: 16px; /* 设置图标宽度 */
    height: 16px; /* 设置图标高度 */
    margin-right: 3px; /* 图标和文本之间的间距 */
}

.greentick{
  width: 16px; /* 设置图标宽度 */
  height: 16px; /* 设置图标高度 */
  margin-right: 3px; /* 图标和文本之间的间距 */
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
    padding-left: 16px;
}

.phone-input::placeholder {
    font-size: 12px; /* 设置占位符字体大小 */
    color: #A7B5C9; /* 可选：设置占位符颜色 */
    position: relative;
}

.phonenumberinput input {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 0px 4px 4px 0px;
  box-sizing: border-box;

}

.error-border {
  border-color: #F53126 !important; /* 修改边框颜色为红色 */
}

.phonenumber-pre select.error-border {
  border-color: #F53126 !important; /* 针对 select 的边框颜色 */
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
  user-select: none; /* 禁止选中文本 */
}

.slider {
  width: 29px;
  height: 31px;
  background: #FFFFFF;
  position: absolute;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #C6CFDC;
  user-select: none; /* 禁止选中文本 */
}

.arrow {
  position: relative;
  left: 10px;
  width: 9px;
  height: 10px;
  top: 1px;
}
.greenarrow{
  width: 16px;
  height: 16px;
  position: absolute;
  left: 6px;
  top: 7px;
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
    border-radius: 4px;
    border: 1px solid #C6CFDC;
    padding-left: 16px;
}

.input-box::placeholder {
    font-size: 12px; /* 设置 placeholder 文字大小 */
    color: #A7B5C9; /* 可选：设置 placeholder 文字颜色 */
    position: relative;
    line-height: 16.8px;
    font-weight: 400;
}

.get-code-button {
    width: 92px; /* 设置按钮宽度 */
    height: 33px; /* 设置按钮高度 */
    border-radius: 4px;
    border: 1px solid #C6CFDC;
    background-color: #FFFFFF;
    font-size: 12px;
    color: #1E223C;
    cursor: pointer;
}


.secretcode-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
  top:98px;
}
.input-container {
    position: relative; /* 为输入框创建一个相对定位的容器 */
}
.codeinput-box{
  width: 282px; /* 设置文本框宽度 */
  height: 33px; /* 设置文本框高度 */
  margin-right: 8px; /* 设置与按钮之间的间距 */
  border-radius: 4px;
  border: 1px solid #C6CFDC;
  flex-grow: 1;
  padding-left: 16px;
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
    line-height: 16.8px;
    font-weight: 400;
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
.modal-overlay {
    position: fixed; /* 使用固定定位，使其覆盖整个视窗 */
    top: 0; /* 从顶部开始 */
    left: 0; /* 从左侧开始 */
    width: 333px; /* 占满整个宽度 */
    height: 500px; /* 占满整个高度 */
    background-color: rgba(0, 0, 0, 0.5); /* 黑色背景，50%透明度 */
    display: flex; /* 使用弹性盒布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    z-index: 1000; /* 设置z-index，确保在最上层 */
}

.modal-content {
    width: 272px; /* 弹出窗口宽度 */
    height: 162px; /* 高度可自适应内容 */
    background-color: #fff; /* 白色背景 */
    border-radius: 4px; /* 圆角 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 阴影效果 */
    text-align: center; /* 文本居中 */
    z-index: 1001; /* 确保内容层级高于背景 */
}
.modaltext1 {
    font-size: 16px; /* 设置第一行文字大小 */
    color: #1E223C; /* 设置文字颜色 */
    font-weight: 500;
    line-height: 22.4px;
    position: absolute;
    top:185px;
    left: 45px;
    width: 240px;
    height: 22px;

}

.modaltext2 {
    font-size: 14px; /* 设置第二行文字大小 */
    color: #1E223C; /* 设置文字颜色 */
    font-weight: 400;
    line-height: 19.6px;
    position: absolute;
    top: 219px;
    width: 240px;
    height: 20px;
    left: 45px;
}

.modaltext3 {
    font-size: 14px; /* 设置第三行文字大小 */
    color: #1E223C; /* 设置文字颜色 */
    font-weight: 400;
    line-height: 19.6px;
    position: absolute;
    top: 247px;
    left: 45px;
}
.links1 .link1{
  text-decoration: none; /* 去掉链接下划线 */
    color: blue; /* 链接颜色 */
    font-size: 14px; /* 字体大小 */
    position: relative;
}

.modalbutton-container {
    position: absolute;
    top: 0px;
}

.modalbutton1, .modalbutton2 {
    border-radius: 4px; /* 圆角 */
    cursor: pointer; /* 鼠标悬停时显示为手型 */
    border: 1px solid #C6CFDC;
    font-size: 14px;
    font-weight: 500;
    line-height: 19.6px;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 283px;
}

.modalbutton1 {
    background-color: #FFFFFF; /* 按钮1的背景色 */
    color: #1E223C; /* 按钮1文字颜色 */
    width: 66px;
    height: 32px;
    position: absolute;
    left: 44.5px;
}

.modalbutton2 {
    background-color: #5CA9F9; /* 按钮2的背景色 */
    color: #FFFFFF; /* 按钮2文字颜色 */
    width: 52px;
    height: 32px;
    position: absolute;
    left: 175.5px;
}



.private-box {
    display: flex; /* 使用flex布局使内容排列在一行 */
    align-items: center; /* 垂直居中对齐 */
    position: absolute;
    top: 200px;
    width: 282px;
    /* height: 17px; */ /* 可以去掉这个设置 */
}

.circle {
    width: 16px; /* 圆圈宽度 */
    height: 16px; /* 圆圈高度 */
    background-color: transparent; /* 背景透明 */
    margin-right: 6px; /* 圆圈与文字之间的间距 */
    position: relative;
    bottom: 1px;
}

.agreement-text {
    margin-right: 5px; /* 文本与链接之间的间距 */
    font-size: 12px; /* 字体大小 */
    line-height: 10px; /* 行高设置，与圆圈对齐 */
    margin-right: 6px;
}

.links .link {
    text-decoration: none; /* 去掉链接下划线 */
    color: blue; /* 链接颜色 */
    font-size: 12px; /* 字体大小 */
    bottom: 2px;
    position: relative;
}

.loginmethod-container{
  width: 187px;
  height: 74px;
  margin: 0 auto;
  position: relative;
  top:218px;
}
.longinwaytext-box {
    display: flex; /* 使用flex布局使内容排列在一行 */
    align-items: center; /* 垂直居中对齐 */
}

.line {
    width: 47.5px; /* 直线长度 */
    height: 1px; /* 直线高度 */
    background-color: #CFD8E5; /* 直线颜色 */
}

.other-login-text {
    margin: 0 10px; /* 文本与线之间的间距 */
    color: #6A6C7D;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.8px;
}
.longinwaybutton-box {
    display: flex; /* 使用flex布局以便对齐 */
    justify-content: center; /* 水平居中对齐 */
    position: relative;
    top: 24px;
}
.custom-button {
    width: 112px; /* 按钮宽度 */
    height: 33px; /* 按钮高度 */
    border-radius: 46px; /* 圆角 */
    border: 1px solid #C6CFDC;
    cursor: pointer; /* 鼠标悬停时显示为可点击 */
    background-color:#FFFFFF;
    font-size: 12px;
    font-weight: 600;
}
.custom-button .icon {
    width: 14.4px; /* 设置图片宽度 */
    height: 14.4px; /* 设置图片高度 */
    margin-right: 0.5px; /* 图片与按钮之间的间距 */
    position: relative;
    bottom: 1.5px;
}

</style>
