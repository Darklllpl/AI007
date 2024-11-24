<template>
    <div class="beVIP-modal">
        <div class="beVIP-content">
            <div class="left-side">
                <!-- 左侧内容 -->
                 <div class="title">开通会员，解锁超值权益</div>
                 <div class="field">XXXX权益</div>
                 <div class="textblock">
                    <div class="textline">
                        <img src="../../assets/img/setting/circle.png" alt="圆圈" class="circle-icon">
                        <div class="value">解释权益解释权益解释权益解释权益</div>
                    </div>
                    <div class="textline">
                        <img src="../../assets/img/setting/circle.png" alt="圆圈" class="circle-icon">
                        <div class="value">解释权益解释权益解释权益解释权益</div>
                    </div>
                    <div class="textline">
                        <img src="../../assets/img/setting/circle.png" alt="圆圈" class="circle-icon">
                        <div class="value">解释权益解释权益解释权益解释权益</div>
                    </div>
                 </div>

                 <div class="field">XXXX权益</div>
                 <div class="textblock">
                    <div class="textline">
                        <img src="../../assets/img/setting/circle.png" alt="圆圈" class="circle-icon">
                        <div class="value">解释权益解释权益解释权益解释权益</div>
                    </div>
                    <div class="textline">
                        <img src="../../assets/img/setting/circle.png" alt="圆圈" class="circle-icon">
                        <div class="value">解释权益解释权益解释权益解释权益</div>
                    </div>
                    <div class="textline">
                        <img src="../../assets/img/setting/circle.png" alt="圆圈" class="circle-icon">
                        <div class="value">解释权益解释权益解释权益解释权益</div>
                    </div>
                 </div>

                 <div class="field">XXXX权益</div>
                 <div class="textblock">
                    <div class="textline">
                        <img src="../../assets/img/setting/circle.png" alt="圆圈" class="circle-icon">
                        <div class="value">解释权益解释权益解释权益解释权益</div>
                    </div>
                    <div class="textline">
                        <img src="../../assets/img/setting/circle.png" alt="圆圈" class="circle-icon">
                        <div class="value">解释权益解释权益解释权益解释权益</div>
                    </div>
                    <div class="textline">
                        <img src="../../assets/img/setting/circle.png" alt="圆圈" class="circle-icon">
                        <div class="value">解释权益解释权益解释权益解释权益</div>
                    </div>
                 </div>

                 <button class="introduction-btn">查看完整权益介绍 ></button>
            </div>
            <div class="right-side">
                <!-- 右侧内容 -->
                <div class="head">
                    <img src="../../assets/img/setting/avatar.png" alt="头像" class="avatar-icon">
                    <div class="rtextblock">
                        <div class="rtextline1">
                            <div class="rtext1">开通账号：</div>
                            <div class="rtext2">17787772654</div>
                            <button class="close-button"@click="closeModal">
                                <img src="../../assets/img/setting/close.png" alt="关闭" class="close-icon">
                            </button>
                        </div>
                        <div class="rtext3">您尚未开通会员</div>
                    </div>
                </div>

                <div class="content">
                    <div class="rechargebutton-container">
                        <div 
                            class="rechargebutton rechargebutton1" 
                            :class="{ active: selectedRecharge === 15 }" 
                            @click="selectRecharge(15)">
                            <div class="text-line1">开通一年</div>
                            <div class="textcontainer textcontainer1">
                                <div class="text-line2">￥</div>
                                <div class="text-line3">15</div>
                            </div>
                            <div class="text-line4">¥30</div>
                        </div>
                        <div 
                            class="rechargebutton rechargebutton2" 
                            :class="{ active: selectedRecharge === 149 }" 
                            @click="selectRecharge(149)">
                            <div class="text-line1">开通两年</div>
                            <div class="textcontainer textcontainer2">
                                <div class="text-line2">￥</div>
                                <div class="text-line3">149</div>
                            </div>
                            <div class="text-line4">¥299</div>
                        </div>
                        <div 
                            class="rechargebutton rechargebutton3" 
                            :class="{ active: selectedRecharge === 249 }" 
                            @click="selectRecharge(249)">
                            <div class="text-line1">开通三年</div>
                            <div class="textcontainer textcontainer3">
                                <div class="text-line2">￥</div>
                                <div class="text-line3">249</div>
                            </div>
                            <div class="text-line4">¥399</div>
                        </div>
                    </div>

                    <div class="rtext4">你可以选择每月支付 ￥16.00 或每年支付 ￥168.00 订阅滴答清单高级会员，订阅费用会通过iTunes 扣除。
                        订阅将自动续费，除非你在当前订阅结束前24小时以上取消自动续订。订阅成功后，
                        你可在 iTunes Store 中管理订阅。购买后如果未订阅成功，可尝试恢复购买
                    </div>

                    <div class="rtextline2">
                        <img src="../../assets/img/setting/wechat.png" alt="微信" class="wechat-icon">
                        <div class="rtext5">微信支付</div>
                    </div>

                    <button class="buybtn" @click="forshowPay">确认购买</button>

                    <div class="rtextline3">
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
                        <div class="rtext6">同意</div>
                        <a href="xxxxxx协议" class="link">xxxxxx协议</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <pay :rechargeAmount="selectedRecharge" v-if="showPay" @close="showPay = false"/>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import pay from './pay.vue';

const emit = defineEmits();
const selectedRecharge = ref<number | null>(15); // 用于存储选中的充值金额
const isFirstImage = ref(false); // 控制当前显示的图片
const showPay=ref(false);

const selectRecharge = (amount: number) => {
    selectedRecharge.value = amount; // 更新选中的充值金额
}

// 切换图片状态
function toggleImage() {
    isFirstImage.value = !isFirstImage.value;
}

const closeModal = () => {
    emit('close'); // 触发关闭事件
};
const forshowPay=()=>{
    showPay.value=true;
}
</script>

<style lang="scss" scoped>
.beVIP-modal {
    background-color: rgba(0, 0, 0, 0); /* 半透明背景 */
    display: flex; /* 使用 flexbox 布局 */
    z-index: 1000; /* 确保在最上层 */
    position: absolute;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 纵向居中 */
}

.beVIP-content {
    background: white; /* 窗口背景色 */
    border-radius: 8px; /* 圆角 */
    width: 620px; /* 宽度 */
    height: 475px;
    display: flex; /* 使用 flexbox 布局分左右 */
    box-shadow: 0px 2px 12.5px 0px #0000001C;
}

.left-side {
    flex: 1; /* 左侧占据剩余空间 */
    padding: 10px; /* 内边距 */
    width: 260px;
    height: 475px;
    background: #F7AF001A;
    padding: 20px;
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
    width: 220px;
    height: 28px;
    margin-bottom: 24px;
}

.field{
    font-family: PingFang SC;
font-size: 14px;
font-weight: 600;
line-height: 19.6px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #373B52;
margin-bottom: 12px;
}

.textblock{
    width: 220px;
    height: 67px;
    padding-left: 16px;
    margin-bottom: 16px;
}

.textline{
    display: flex;
    margin-bottom: 8px;
}
.circle-icon{
    width: 6px;
    height: 6px;
    margin-top: 6px;
}

.value{
    font-family: PingFang SC;
font-size: 12px;
font-weight: 400;
line-height: 16.8px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #9BA3AF;
margin-left: 4px;
}

.introduction-btn{
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #6A6C7D;
    border: none;
    background: none;
    cursor: pointer;
    margin-top: 14px;
}

.right-side {
    flex: 1; /* 右侧占据剩余空间 */

    width: 360px;
    height: 475px;
}

.head{
    display: flex;
    padding-top: 10px; /* 内边距 */
    padding-left: 20px;
    padding-right: 20px;
    width: 360px;
    height: 70px;
    border-bottom: 2px solid #E0E2E6;
}
.avatar-icon{
    width: 50px;
    height: 50px;
}
.rtextblock{
    flex: 1;
    margin-left: 14px;
    margin-top: 4.5px;
}
.rtextline1{
    display: flex;
}
.rtext1{
    font-family: PingFang SC;
font-size: 14px;
font-weight: 600;
line-height: 19.6px;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #373B52;
width: 70px;
height: 20px;
}
.rtext2{
    font-family: PingFang SC;
font-size: 12px;
font-weight: 400;
line-height: 16.8px;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #1E223C;
margin-top: 2px;
}

.close-button{
    width: 24px;
    height: 24px;
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 80px;
}
.close-icon{
    width: 24px;
    height: 24px;
}
.rtext3{
    font-family: PingFang SC;
font-size: 12px;
font-weight: 400;
line-height: 16.8px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #1E223C;
}

.content{
    padding-top: 37px;
    padding-left: 20px;
    padding-right: 20px;
}
.rechargebutton-container {
    height: 120px;
    display: flex;
    gap: 16px;
    padding-left: 0px;
}
.rechargebutton {
    border: 0.68px solid #E0E2E6;
    background-color: #FFFFFF; /* 默认背景色 */
    cursor: pointer;
    transition: border 0.3s, background-color 0.3s; /* 平滑过渡 */
}

.rechargebutton.active {
    border: 0.68px solid #F7AF00;
    background-color: #FFF7E5; /* 点击后的背景颜色 */
}

.rechargebutton1,
.rechargebutton2,
.rechargebutton3 {
    width: 120px;
    height: 120px;
    border: 0.68px solid #E0E2E6;
    border-radius: 8px;
}

.text-line1 {
    font-family: PingFang SC;
font-size: 13.64px;
font-weight: 600;
line-height: 19.09px;
text-align: center;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #373B52;
    position: relative;
    top: 20.84px;
}

.textcontainer1 {
    width: 43.91px;
    height: 37.5px;
    display: flex;
    margin-left: 26.05px;
    margin-top: 25px;
}
.textcontainer2{
    width: 60.91px;
    height: 37.5px;
    display: flex;
    margin-left: 17.55px;
    margin-top: 25px;
}
.textcontainer3{
    width: 60.91px;
    height: 37.5px;
    display: flex;
    margin-left: 17.55px;
    margin-top: 25px;
}
.text-line2 {
    font-family: Alibaba PuHuiTi;
font-size: 13.64px;
font-weight: 400;
line-height: 18.71px;
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
    font-family: Alibaba PuHuiTi;
font-size: 27.27px;
font-weight: 400;
line-height: 37.42px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;

    color: #F7AF00;
    width: 15px;
    height: 34px;
    letter-spacing: -1.5px; /* 调整字间距 */
}

.text-line4{
    margin-left: 38px;
    width: 20px;
    height: 15px;
    font-family: PingFang SC;
    font-size: 10.91px;
    font-weight: 400;
    line-height: 15.27px;
    text-align: left;
    text-decoration-line: line-through;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #6A6C7D;
}

.rtext4{
    font-family: PingFang SC;
font-size: 12px;
font-weight: 400;
line-height: 16.8px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #BFBFBF;
margin-top: 16px;
}

.rtextline2{
    display: flex;
    padding-left: 113px;
    padding-top: 20px;
}
.wechat-icon{
    width: 20px;
    height: 20px;
    background-color: #49B94F;
    border-radius: 3.33px;
    margin-top: 1px;
}

.rtext5{
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 400;
    line-height: 22.4px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #373B52;
    margin-left: 10px;
}
.buybtn{
width: 288px;
height: 40px;
background-color: #5CA9F9;
color: #FFFFFF;
border: none;
border-radius: 4px;
margin-left: 16px;
margin-top: 12px;
cursor: pointer;
}

.rtextline3{
    display: flex;
    width: 320px;
    height: 17px;
    margin-top: 12px;
    margin-left: 16px;
}
.circle{
    height: 16px;
    width: 16px;
}
.rtext6{
    font-family: PingFang SC;
font-size: 12px;
font-weight: 400;
line-height: 16.8px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #6A6C7D;
margin-left: 6px;
}

.link {
    text-decoration: none; /* 去掉链接下划线 */
    color: #5CA9F9; /* 链接颜色 */
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin-left: 8px;
    bottom: 2px;
}

</style>
