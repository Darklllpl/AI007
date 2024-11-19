<template>
    <div class="pay-modal">
        <div class="pay-content">
            <div class="header">
                <span class="title">充值</span>
                <button class="close-button" @click="close">
                    <img src="../../assets/img/recharge/close.png" alt="关闭" class="close-icon" />
                </button>
            </div>

            <div class="text-box">
                <div class="account">账号：177877763521</div>
            </div>

            <div class="wechatnote-container">
                <img src="../../assets/img/recharge/wechat.png" alt="wechat" class="wechat-icon" />
                <div class="wechatnote">微信扫码，支付 {{ rechargeAmount }} 元</div>
            </div>


            <img src="../../assets/img/recharge/QRcode.png" alt="QRcode" class="QRcode-icon"/>
            <div class="bottom"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits,defineProps } from 'vue';

const emit = defineEmits();

const close = () => {
    emit('close'); // 触发关闭事件
}

// 定义 props，并接收父组件传递的数据
const props = defineProps({
    rechargeAmount: String // 指定类型为字符串
});
</script>

<style lang="scss" scoped>
.pay-modal {
    background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
    display: flex; /* 使用 flexbox 布局 */
    z-index: 1000; /* 确保在最上层 */
    position: absolute;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    width: 620px;
    height: 475px;
}

.pay-content {
    background: white; /* 窗口背景色 */
    border-radius: 8px; /* 圆角 */
    width: 304px; /* 宽度 */
    height: 289px;
    overflow: hidden;
    position: absolute;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}

.header {
    width: 304px;
    height: 54px;
    background: #5CA9F9;
    position: absolute;
}

.title {
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 600;
    line-height: 22.4px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    width: 32px;
    height: 22px;
    position: absolute;
    margin-top: 16px;
    margin-left: 136px;
    color: #FFFFFF;
}

.close-button {
    width: 24px;
    height: 24px;
    border: none; /* 去掉边框 */
    background: transparent; /* 去掉背景 */
    cursor: pointer; /* 鼠标悬停时显示为指针 */
    position: absolute;
    margin-top: 16px;
    margin-left: 264px;
}

.close-button:focus {
    outline: none; /* 去掉焦点状态时的边框 */
}
.text-box {
    width: 272px;
    height: 17px;
    position: relative;
    margin-left: 16px;
    margin-top: 66px;
}

.account {
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #1E223C;
}
.wechatnote-container{
    height: 20px;
    display: flex;
    position: relative;
    top: 14px;
    margin-left: 79px;
}

.wechat-icon{
    width: 16px;
    height: 16px;

}

.wechatnote{
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #1E223C;
    margin-left: 8px;
}

.QRcode-icon{
    width: 130px;
    height: 130px;
    position: relative;
    top: 17px;
    margin-left: 87px;
}

.bottom{
    height: 20px;
    width: 304px;
    position: relative;
    top: 37px;
    background-color: #5CA9F9;
    border-bottom-left-radius: 4px;  
    border-bottom-right-radius: 4px; 
}
</style>
