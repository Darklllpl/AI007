<template>
    <div class="check-update-modal">
        <div class="check-update-content">
            <div class="head">
                <div class="title">修改密码</div>
                <button class="close-button" @click="close" aria-label="关闭">
                    <img src="../../assets/img/setting/close.png" alt="关闭" class="close-icon">
                </button>
            </div>

            <div class="field">请输入原密码</div>
            <input type="password" placeholder="请输入" class="password">
            <div class="field">请输入新密码</div>
            <input type="password" placeholder="请输入" class="password">
            <div class="field">手机号验证</div>
            <input type="SMScode" placeholder="短信验证码" class="SMScode">
            <button class="SMScode-btn">获取验证码</button>
            
            <div class="textline1">
                <div class="text1">验证码将发送至</div>
                <div class="phonenumber">+86130******00</div>
            </div>

            <button class="sendbtn">提交</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from 'vue';

const emit = defineEmits();
const checkStatus = ref('updateAvailable'); // 或 'update-available'，用于测试显示不同内容

const close = () => {
    emit('close'); // 触发关闭事件
}
</script>

<style lang="scss" scoped>
.check-update-modal {
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

.check-update-content {
    background: white; /* 窗口背景色 */
    padding: 20px; /* 内边距 */
    border-radius: 8px; /* 圆角 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影 */


    width: 400px;
    height: 389px;
}

.head{
    display: flex;
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

.field{
    font-family: PingFang SC;
font-size: 12px;
font-weight: 400;
line-height: 16.8px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #1E223C;
margin-top: 20px;
}

.password{
    border: 1px solid #F5F5F6;
    background-color: #FFFFFF;

    width: 360px;
    height: 40px;
    border-radius: 4px;
    margin-top: 4px;
    padding-left: 14px;
}

.password::placeholder{
    color: #BFBFBF;
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
    margin-top: 10px;
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

.phonenumber{
    font-family: PingFang SC;
font-size: 12px;
font-weight: 600;
line-height: 16.8px;
text-align: center;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #6A6C7D;
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
