<template>
    <div class="modifyPhone-modal">
        <!-- 身份验证内容 -->
        <div v-if="currentStep === 1" class="modifyPhone-content1">
            <div class="head">
                <div class="title">身份验证</div>
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
            <input type="text" placeholder="短信验证码" class="SMScode">
            <button class="SMScode-btn">获取验证码</button>
            <button class="sendbtn" @click="nextStep">确认</button>
        </div>

        <!-- 修改手机号内容 -->
        <div v-else-if="currentStep === 2" class="modifyPhone-content2">
            <div class="head">
                <div class="title">修改手机号</div>
                <button class="close-button" @click="close" aria-label="关闭">
                    <img src="../../assets/img/setting/close.png" alt="关闭" class="close-icon">
                </button>
            </div>

            <div class="field">你正在修改登录手机号，请输入新手机号完成修改</div>
            <div class="textline1">
                <div class="text1">验证码将发送至:</div>
                <div class="phonenumber">+86130******00</div>
            </div>

            <div class="text2">手机号</div>
            <input type="text" placeholder="手机号" class="phonenumberinput">
            <div class="field">完成修改后，你可使用新手机号进行登录</div>
            <button class="sendbtn" @click="nextStep">提交</button>
        </div>

        <!-- 验证新手机号内容 -->
        <div v-else-if="currentStep === 3" class="modifyPhone-content3">
            <div class="head">
                <div class="title">验证新手机号</div>
                <button class="close-button" @click="close" aria-label="关闭">
                    <img src="../../assets/img/setting/close.png" alt="关闭" class="close-icon">
                </button>
            </div>

            <div class="field">你正在修改登录手机号，请先完成身份验证。验证码已发送至:</div>
            <div class="textline1">
                <div class="text1">验证码将发送至</div>
                <div class="phonenumber">+86130******00</div>
                <div class="text1">有效期十分钟</div>
            </div>
            <input type="text" placeholder="短信验证码" class="SMScode">
            <button class="SMScode-btn">获取验证码</button>
            <button class="sendbtn" @click="nextStep">提交</button>
        </div>

        <!-- 修改成功内容 -->
        <div v-else-if="currentStep === 4" class="modifyPhone-content4">
            <div class="head">
                <div class="title">修改成功</div>
                <button class="close-button" @click="close" aria-label="关闭">
                    <img src="../../assets/img/setting/close.png" alt="关闭" class="close-icon">
                </button>
            </div>

            <img src="../../assets/img/setting/tick.png" alt="成功" class="tick-icon">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from 'vue';

const emit = defineEmits();
const currentStep = ref(1); // 初始化当前步骤为1

const close = () => {
    emit('close'); // 触发关闭事件
};

// 下一个步骤
const nextStep = () => {
    if (currentStep.value < 4) {
        currentStep.value++; // 增加步骤
    }
};
</script>

<style lang="scss" scoped>
.modifyPhone-modal {
    background-color: rgba(0, 0, 0, 0); /* 背景半透明 */
    display: flex; /* 使用 flexbox 布局 */
    z-index: 1000; /* 确保在最上层 */
    position: absolute;
    position: fixed; /* 使用 fixed 定位，覆盖整个视口 */
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0; 
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
    height: 327px;
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
}

</style>
