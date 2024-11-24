<template>
    <div class="modifyPhone-modal">
        <!-- 身份验证内容 -->
        <div v-if="currentStep === 1" class="modifyPhone-content1">
            <div class="head">
                <div class="title">注销账号</div>
                <button class="close-button" @click="close" aria-label="关闭">
                    <img src="../../assets/img/setting/close.png" alt="关闭" class="close-icon">
                </button>
            </div>

            <div class="field">你正在修改登录手机号，请先完成身份验证。验证码已发送至:</div>
            <div class="textline1">
                <div class="text1">验证码将发送至：</div>
                <div class="phonenumber">+86130******00</div>
                <div class="text1">有效期十分钟</div>
            </div>
            <input v-model="verificationCode" type="text" placeholder="短信验证码" class="SMScode">
            <button 
                class="SMScode-btn" 
                @click="GetVerificationCode">
                {{ buttonText }} 
            </button>
            <button class="sendbtn" @click="nextStep">确认</button>
        </div>

        <!-- 修改成功内容 -->
        <div v-else-if="currentStep === 2" class="modifyPhone-content2">
            <div class="head">
                <div class="title">确认注销</div>
                <button class="close-button" @click="close" aria-label="关闭">
                    <img src="../../assets/img/setting/close.png" alt="关闭" class="close-icon">
                </button>
            </div>

            <div class="field">注销Cyber账号。注销不可恢复！</div>
            <button class="sendbtn" @click="Accountcancel">确认</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from 'vue';
import { getVerificationCode,testVerificationCode,cancel } from "@/render/api/login";
import { useRouter } from "vue-router";
const router = useRouter();

const buttonText = ref('获取验证码'); // 按钮文字
const isCounting = ref(false); // 倒计时状态
const countdown = ref(60); // 倒计时初始值
const showSuccessMessage = ref(false); // 控制成功提示是否显示

const emit = defineEmits();
const currentStep = ref(1); // 初始化当前步骤为1
const verificationCode=ref('');
const phoneInput = document.querySelector('.phonenumberinput');

const close = () => {
    emit('close'); // 触发关闭事件
};

// 检查输入的手机号是否有效
function validatePhoneNumber(phoneNumber) {
  // 检查输入框不为空且仅包含数字
  const isValid = phoneNumber.trim() !== '' && /^\d+$/.test(phoneNumber);
  return isValid;
}

// 下一个步骤
const nextStep = async () => {
    if (currentStep.value==1){
        const data = {
            verificationCode: verificationCode.value, // 根据登录方式设置 loginType
        };

        const response = await testVerificationCode(data);
        if(response.code == '200'){
            if (currentStep.value < 2) {
                currentStep.value++; // 增加步骤
            }
        }
    }else if(currentStep.value==2){
        if(validatePhoneNumber(phoneInput)){
            if (currentStep.value < 2) {
                currentStep.value++; // 增加步骤
            }
        }
    }
};

// 获取验证码
async function GetVerificationCode() {
  isCounting.value = true;
  countdown.value = 60; // 初始化倒计时为60秒
  updateButtonText(); // 更新按钮文本

  // 显示验证码发送成功的提示
  showSuccessMessage.value = true;

  // 设置5秒钟后隐藏提示
  setTimeout(() => {
    showSuccessMessage.value = false; // 隐藏提示
  }, 5000);

  const timer = setInterval(() => {
    countdown.value--;
    updateButtonText(); // 更新按钮文本

    if (countdown.value === 0) {
      clearInterval(timer);
      isCounting.value = false;
      buttonText.value = '获取验证码'; // 倒计时结束后恢复文本
    }
  }, 1000);

  const data={
    phone: phoneNumber.value
  };
  // 发送验证码请求
  try {
    const response = await getVerificationCode(data)
    
    if (response.code) {
      console.log('验证码已发送');
    } else {
      console.error('发送验证码失败:', response.message);
      // 可以处理更多错误逻辑
    }
  } catch (error) {
    console.error('请求出现错误:', error);
  }
}

// 更新按钮文本
function updateButtonText() {
  buttonText.value = isCounting.value ? `重新获取(${countdown.value}s)` : '获取验证码';
}

// 注销账号
const Accountcancel = async () => {
        const response = await cancel();
        if(response.code == '200'){
        // 注销成功后，重定向到登录页面或退出程序
        router.push("/login");
        }
};
</script>

<style lang="scss" scoped>
.modifyPhone-modal {
    background-color: rgba(0, 0, 0, 0); /* 背景半透明 */
    display: flex; /* 使用 flexbox 布局 */
    z-index: 1000; /* 确保在最上层 */
    position: absolute;
    width: 600px; /* 设置宽度 */
    height: 480px; /* 设置高度 */
    display: flex; /* 使用 flexbox 布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}

.modifyPhone-content1,
.modifyPhone-content2,
.modifyPhone-content3,
.modifyPhone-content4{
    background: white; /* 窗口背景色 */
    padding: 20px; /* 内边距 */
    border-radius: 8px; /* 圆角 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影 */
    width: 400px;
    width: 400px;
    height: 227px;
}
.modifyPhone-content2{
    height: 146px;
}

.head{
    display: flex;
    margin-bottom: 10px;
}

.title{
    font-family: PingFang SC;
font-size: 20px;
font-weight: 600;
line-height: 28px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #373B52;
}

.close-button {
    background: none; /* 清除按钮背景 */
    border: none; /* 清除按钮边框 */
    cursor: pointer; /* 鼠标悬停时显示手形光标 */
    margin-left: auto; /* 自动调整到右侧 */
}

.close-icon{
    width: 24px;
    height: 24px;
}
.tick-icon{
    width: 60px;
    height: 60px;
    display: block; /* 将图标设置为块级元素 */
    margin: 46px auto; /* 上下间距为20px，左右自动调整 */
}

.field{
    font-family: PingFang SC;
font-size: 12px;
font-weight: 400;
line-height: 16.8px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #6A6C7D;
}

.password{
    border: 1px solid #F5F5F6;
    background-color: #F9FBFD;

    width: 360px;
    height: 40px;
    border-radius: 4px;
    margin-top: 4px;
    padding-left: 14px;
}

.password::placeholder{
    color: #A7B5C9;
    font-family: PingFang SC;
font-size: 14px;
font-weight: 400;
line-height: 19.6px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
}

.SMScode{
    border: 1px solid #E0E2E6;
    background-color: #FFFFFF;
    color: #A7B5C9;
    width: 216px;
    height: 40px;
    margin-top: 4px;
    border-radius: 4px;
    padding-left: 14px;
}

.SMScode::placeholder{
    color: #BFBFBF;
    font-family: PingFang SC;
font-size: 14px;
font-weight: 400;
line-height: 19.6px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
}
.phonenumberinput{
    border: 1px solid #E0E2E6;
    background-color: #FFFFFF;
    color: #A7B5C9;
    width: 360px;
    height: 40px;
    margin-top: 4px;
    border-radius: 4px;
    padding-left: 14px;
    margin-bottom: 22px;
}

.phonenumberinput::placeholder{
    color: #BFBFBF;
    font-family: PingFang SC;
font-size: 14px;
font-weight: 400;
line-height: 19.6px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
}

.SMScode-btn{
    width: 124px;
    height: 40px;
    font-family: PingFang SC;
font-size: 12px;
font-weight: 600;
line-height: 16.8px;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #1E223C;
border: 1px solid #C6CFDC;
border-radius: 6px;
background-color: #FFFFFF;
margin-left: 20px;
cursor: pointer;
}

.textline1{
    display: flex;
    margin-top: 4px;
    margin-bottom: 20px;
}

.text1{
    font-family: PingFang SC;
font-size: 12px;
font-weight: 400;
line-height: 16.8px;
text-align: center;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #6A6C7D;
}
.text2{
    font-family: PingFang SC;
font-size: 12px;
font-weight: 400;
line-height: 16.8px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #1E223C;
margin-top: 40px;
}

.phonenumber{
    font-family: PingFang SC;
font-size: 12px;
font-weight: 600;
line-height: 16.8px;
text-align: center;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #6A6C7D;
margin-left: 4px;
margin-right: 10px;
cursor: pointer;
}

.sendbtn{
    width: 88px;
    height: 31px;
    border-radius: 6px;
    color: #FFFFFF;
    background-color: #5CA9F9;
    border: none;
    margin-left: 272px;
    margin-top: 20px;
    cursor: pointer;
}

</style>
