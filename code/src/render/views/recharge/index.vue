<template>
    <div class="modal-overlay" @click.self="closeModal">
        <div class="container">
            <div class="header">
                <span class="title">充值</span>
                <button class="close-button" @click="closeModal">
                    <img src="../../assets/img/recharge/close.png" alt="关闭" class="close-icon" />
                </button>
            </div>

            <div v-if="rechargestatus === 1" class="Rechargemessage-box">
                <img src="../../assets/img/recharge/RechargeSuccessfully.png" alt="充值成功" class="Rechargemessage-icon">
                <div class="Rechargemessage-text">充值成功</div>
            </div>
            <div v-else-if="rechargestatus === 2" class="Rechargemessage-box">
                <img src="../../assets/img/recharge/RechargeFailure.png" alt="充值失败" class="Rechargemessage-icon">
                <div class="Rechargemessage-text">充值失败</div>
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
    </div>

    
</template>


<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useRouter } from "vue-router";

const emit = defineEmits();
const router = useRouter();
const selectedRecharge = ref<number | null>(5); // 当前选中的充值金额
const rechargestatus = ref<number>(1); // 充值状态，1为成功，2为失败

const closeModal = () => {
    emit('close'); // 触发关闭事件
};

const goAIchat = () => {
  router.push("/AIchat");
};

// 选择充值金额的方法
const selectRecharge = (amount: number) => {
  selectedRecharge.value = amount; // 更新选中的充值金额
  // 模拟充值结果
  // 这里可以根据实际情况调用后台接口，并更新 rechargestatus 的值
};
</script>


<style lang="scss" scoped>
.modal-overlay {
    position: absolute; /* 使用 fixed 定位 */
    background: rgba(0, 0, 0, 0); /* 半透明背景 */
    z-index: 2000;
    width: 1200px;
    height: 768px;
}
.container {
    width: 304px;
    height: 414px;
    border-radius: 4px; /* 添加四个角的圆角 */
    overflow: hidden;   /* 确保内容不会超出圆角边界 */
    border-bottom-left-radius: 4px;  
    background-color: #fff;
    margin-top: 177px;
    margin-left: 448px;
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

.Rechargemessage-box {
    display: flex;
    width: 100px;
    height: 32px;
    background-color: #FFFFFF; /* 纯白背景 */
    box-shadow: 1px 4px 7.4px 0px #0000001A;
    padding-top: 6px;
    padding-left: 12px;
    position: relative; /* 使得 z-index 生效 */
    z-index: 10; /* 增加层级，遮蔽下层组件 */
    opacity: 1; /* 确保不透明 */
    margin-left: 102px;
    margin-top: -15px;
    border-radius: 4px;
}

.Rechargemessage-icon{
    width: 16px;
    height: 16px;
    margin-top: 2px;
}
.Rechargemessage-text{
    font-family: PingFang SC;
font-size: 14px;
font-weight: 400;
line-height: 19.6px;
text-align: center;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #1E223C;
width: 56px;
height: 20px;
margin-left: 2px;
}
.text-box {
    width: 272px;
    height: 17px;
    position: relative;
    top: -5px;
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
    margin-left: 16px;
    margin-top: 12px;
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
    position: relative;
    margin-left: 26px;
    margin-top: 14px;
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
    top: 4px;
    margin-left: 16px;
}

.wechatnote-container{
    width: 146px;
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
