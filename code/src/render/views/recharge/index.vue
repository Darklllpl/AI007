<template>
    <div class="container">
        <div class="header">
            <span class="title">充值</span>
            <button class="close-button" @click="goAIchat">
                <img src="../../assets/img/recharge/close.png" alt="关闭" class="close-icon" />
            </button>
        </div>
        <div class="text-box">
            <div class="account">账号：177877763521</div>
        </div>

        <div class="rechargebutton-container">
            <div 
                class="rechargebutton rechargebutton1" 
                :class="{ active: selectedRecharge === 5 }" 
                @click="selectRecharge(5)">
                <div class="text-line1">加油包</div>
                <div class="textcontainer">
                    <div class="text-line2">￥</div>
                    <div class="text-line3">5</div>
                </div>
            </div>
            <div 
                class="rechargebutton rechargebutton2" 
                :class="{ active: selectedRecharge === 15 }" 
                @click="selectRecharge(15)">
                <div class="text-line1">加油包</div>
                <div class="textcontainer">
                    <div class="text-line2">￥</div>
                    <div class="text-line3">15</div>
                </div>
            </div>
            <div 
                class="rechargebutton rechargebutton3" 
                :class="{ active: selectedRecharge === 99 }" 
                @click="selectRecharge(99)">
                <div class="text-line1">加油包</div>
                <div class="textcontainer">
                    <div class="text-line2">￥</div>
                    <div class="text-line3">99</div>
                </div>
            </div>
        </div>

        <div class="note">备注：5元支持XXX文字交互</div>

        <div class="wechatnote-container">
            <img src="../../assets/img/recharge/wechat.png" alt="wechat" class="wechat-icon" />
            <div class="wechatnote">微信扫码，支付 {{ selectedRecharge }} 元</div>
        </div>

        <img src="../../assets/img/recharge/QRcode.png" alt="QRcode" class="QRcode-icon"/>
        <div class="bottom"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selectedRecharge = ref<number | null>(null); // 当前选中的充值金额

const goAIchat = () => {
  router.push("/AIchat");
};

// 选择充值金额的方法
const selectRecharge = (amount: number) => {
  selectedRecharge.value = amount; // 更新选中的充值金额\
};
</script>

<style lang="scss" scoped>
.container {
    width: 304px;
    height: 414px;
    border-radius: 4px; /* 添加四个角的圆角 */
    overflow: hidden;   /* 确保内容不会超出圆角边界 */
    border-bottom-left-radius: 4px;  
    border-bottom-right-radius: 4px; 
    overflow: hidden;              /* 确保内容不会超出圆角边界 */
}

.header {
    width: 304px;
    height: 54px;
    background: #5CA9F9;
    
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
    top: 16px;
    margin-left: 136px;
    color: #FFFFFF;
}

.close-button {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 15px;
    margin-left: 264px;
    border: none; /* 去掉边框 */
    background: transparent; /* 去掉背景 */
    cursor: pointer; /* 鼠标悬停时显示为指针 */
}

.close-button:focus {
    outline: none; /* 去掉焦点状态时的边框 */
}


.text-box {
    width: 272px;
    height: 17px;
    position: absolute;
    top: 66px;
    margin-left: 16px;
}

.account {
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #1E223C;
}

.rechargebutton-container {
    width: 272px;
    height: 90px;
    position: absolute;
    top: 95px;
    margin-left: 16px;
    display: flex;
}

.rechargebutton {
    border: 1px solid transparent; /* 默认边框颜色 */
    background-color: #FFFFFF; /* 默认背景色 */
    cursor: pointer;
    transition: border 0.3s, background-color 0.3s; /* 平滑过渡 */
}

.rechargebutton.active {
    border: 0.5px solid #F7AF00; /* 点击后的边框颜色 */
    background-color: #FFF7E5; /* 点击后的背景颜色 */
}

.rechargebutton1,
.rechargebutton2,
.rechargebutton3 {
    width: 80px;
    height: 90px;
    border: 0.5px solid #9BA3AF;
    border-radius: 8px;
}

.rechargebutton2 {
    margin-left: 16px;
}

.rechargebutton3 {
    margin-left: 16px;
}

.text-line1 {
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 500;
    line-height: 16.8px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    position: relative;
    top: 8px;
}

.textcontainer {
    width: 28px;
    height: 34px;
    display: flex;
    position: absolute;
    top: 32px;
    margin-left: 26px;
}

.text-line2 {
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #F7AF00;
    width: 9px;
    height: 20px;
    position: relative;
    right: 4px;
    top: 11px;   
}

.text-line3 {
    font-family: PingFang SC;
    font-size: 24px;
    font-weight: 600;
    line-height: 33.6px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #F7AF00;
    width: 15px;
    height: 34px;
    letter-spacing: -1.5px; /* 调整字间距 */
}

.note {
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #9BA3AF;
    position: relative;
    top: 135px;
    margin-left: 16px;
}

.wechatnote-container{
    width: 146px;
    height: 20px;
    display: flex;
    position: absolute;
    top: 220px;
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
    position: absolute;
    top: 248px;
    margin-left: 87px;
}

.bottom{
    height: 20px;
    width: 304px;
    position: absolute;
    top: 394px;
    background-color: #5CA9F9;
    border-bottom-left-radius: 4px;  
    border-bottom-right-radius: 4px; 
}
</style>
