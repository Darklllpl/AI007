<template>
    <div class="aichat-container">
        <div class="sidebar-box">
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

            <div class="page-container">
                <button class="tips-button" @click.stop="openTipsModal">
                    <div class="tips-icon-container">
                        <img src="../../assets/img/AIchat/tips-top.png" alt="打开通知" class="tips-top-icon" />
                        <img src="../../assets/img/AIchat/tips-buttom.png" alt="打开通知" class="tips-buttom-icon" />
                    </div>
                </button>
            </div>

            <button class="setting-button" @click="opensettingModal">
                <img src="../../assets/img/AIchat/setting.png" alt="打开设置" class="setting-icon" />
            </button>
        </div>

        <div class="aibot-box">
            <div class="search-container">
                <img src="../../assets/img/AIchat/search-01.png" alt="搜索" class="search-icon" />
                <input type="text" class="search-input" placeholder="搜索" />
            </div>
            <div class="aibot-list">
                <button class="aibot-container1" @click="selectAIBot('伊利亚')">
                    <img src="../../assets/img/AIchat/Sofia.png" alt="索菲娅" class="aibot-image" />
                    <div class="text-container">
                        <div class="text-top">
                            <div class="text-line1">伊利亚</div>
                            <div class="chattime">15:00</div>
                        </div>
                        <div class="text-buttom">
                            <div class="text-line2">请问您需要什么服务...</div>
                            <img src="../../assets/img/AIchat/bot.png" alt="机器人" class="bot-image" />
                        </div>
                    </div>
                </button>

                <button class="aibot-container2" @click="selectAIBot('其他机器')">
                    <div class="text-container">
                        <div class="text-top">
                            <div class="text-line1">其他机器人</div>
                            <div class="chattime">15:00</div>
                        </div>
                    </div>
                </button>
            </div>
        </div>

        <div class="aichat-box">
            <div v-if="selectedBot">
                <div class="chattitle-box">
                    <div class="botname">{{ selectedBot }}</div>
                    <div class="bottext">@大模型的能力由ChatGPT提供</div>
                    <img src="../../assets/img/AIchat/petrol.png" alt="搜索" class="petrol-icon" />
                    <div class="token">约剩余XXX字数</div>
                    <button class="recharge-button" @click="openRecharge">充值</button>
                </div>
                <div class="progressbar-box">
                    <div class="progress-background">
                        <div class="progress" :style="{ width: progress + '%' }"></div>
                    </div>
                </div>

                <div class="chat-content">
                    <div class="message received-message">
                        <img src="../../assets/img/AIchat/Sofia.png" alt="Bot" class="avatar" />
                        <div class="message-text">请问您需要什么服务</div>
                    </div>
                    <div class="message sent-message">
                        <img src="../../assets/img/AIchat/user.png" alt="User" class="avatar" />
                        <div class="message-text">请问您需要什么服务</div>
                    </div>
                    <div class="message sent-message" v-for="(msg, index) in messages" :key="index">     
                        <img :src="msg.avatar" alt="User" class="avatar" />
                        <div class="message-text">{{ msg.text }}</div>
                    </div>
                </div>

                <div class="input-container">
                    <div class="char-count">{{ charCount }}/500</div>
                    <input
                        type="text"
                        v-model="inputMessage"
                        placeholder="请输入消息，按Enter键 或 点击按钮发送"
                        class="chat-input"
                        maxlength="500" 
                        @input="updateCharCount"
                        @keyup.enter="sendMessage"
                    />
                    <button class="sendbutton" @click="sendMessage">
                        发送
                    </button>
                </div>
            </div>
        </div>


        <!-- 确保 TipsModal 被包括在这里 -->
        <TipsModal v-if="isTipsModalVisible" @close="closeTipsModal" />
        <!-- 确保 SettingModal 被包括在这里 -->
        <SettingModal v-if="isSettingModalVisible" @close="closeSettingModal" />
        <!-- 确保 RechargeModal 被包括在这里 -->
        <RechargeModal v-if="isRechargeModalVisible" @close="closeRecharge" />

    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from 'vue';
import TipsModal from './tipsmodal.vue';  // 确保导入
import SettingModal from '../setting/index.vue';  // 导入设置组件
import RechargeModal from '../recharge/index.vue'

const router = useRouter();
const selectedBot = ref<string | null>(null);
const progress = ref(50); // 设置初始进度为50%
const charCount = ref(0); // 字数计数
const inputMessage = ref(''); // 输入消息的变量
const messages = ref<{ avatar: string; text: string; }[]>([]); // 消息列表

// 控制提示框和设置框的显示状态
const isTipsModalVisible = ref(false);
const isSettingModalVisible = ref(false); // 设置窗口的显示状态
const isRechargeModalVisible =ref(false);

// 跳转到主页的函数
const goHome = () => {
  router.push("/");
};

// 打开充值界面
const openRecharge = () => {
    isRechargeModalVisible.value=true;
};

// 关闭充值界面
const closeRecharge = () => {
    isRechargeModalVisible.value=false;
};

// 打开提示框
const openTipsModal = () => {
  isTipsModalVisible.value = true; // 显示提示框
};

// 关闭提示框
const closeTipsModal = () => {
  isTipsModalVisible.value = false; // 隐藏提示框
};

// 打开设置框
const opensettingModal = () => {
  isSettingModalVisible.value = true; // 显示设置框
};

// 关闭设置框
const closeSettingModal = () => {
  isSettingModalVisible.value = false; // 隐藏设置框
};

// 选择机器人
const selectAIBot = (botName: string) => {
  selectedBot.value = botName;
};

// 更新字数计数函数
const updateCharCount = (event: InputEvent) => {
  const target = event.target as HTMLInputElement; // 转换为 HTMLInputElement
  charCount.value = target.value.length; // 获取输入框的字符长度
};

// 发送消息的函数
const sendMessage = () => {
  if (inputMessage.value.trim() !== '') { // 确保输入不为空
    messages.value.push({ 
      avatar: '../../assets/img/AIchat/user.png', // 用户头像
      text: inputMessage.value // 发送的消息
    });
    inputMessage.value = ''; // 清空输入框
    charCount.value = 0; // 重置字符计数
  }
};
</script>


  
<style lang="scss" scoped>
.aichat-container {
    display: flex; /* 使用flex布局 */
    width: 1200px;
    height: 768px;
    border-radius: 10px;
}

.sidebar-box {
    width: 64px; /* 左侧栏目宽度 */
    height: 768px;
    background-color: #F0F0F0; 
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

.tips-button {
    background: none; /* 去掉背景 */
    border: none; /* 去掉边框 */
    padding: 0; /* 去掉内边距 */
    width: 24px;
    height: auto; /* 高度自适应 */
    position: absolute;
    top: 674px;
    left: 20px;
    cursor: pointer; /* 鼠标样式 */
}

.tips-icon-container {
    display: flex;
    flex-direction: column; /* 垂直排列 */
    align-items: center; /* 对齐中心 */
}

.tips-top-icon {
    width: 20px; 
    height: 17px; 
}

.tips-buttom-icon {
    width: 5px; 
    height: 3px;
}


.setting-button{
    background: none; /* 去掉背景 */
    border: none; /* 去掉边框 */
    padding: 0; /* 去掉内边距 */
    width: 24px;
    height: 24px;
    position: absolute;
    top: 728px;
    left: 20px;
    cursor: pointer; /* 鼠标样式 */
}

.setting-icon {
    width: 100%; /* 确保图标占满按钮 */
    height: auto; /* 自适应高度 */
}

.aibot-box {
    width: 190px; /* 中间栏目宽度 */
    height: 768px;
    background-color: #FAFAFA; /* 示例背景色 */
    border-right: 1px solid #E5E8EC;
}

.search-container {
    position: relative; /* 设置为相对定位，以便子元素绝对定位 */
    top: 13px;
    left: 12px;
    width: 165px;
    height: 24px;
}

.search-input {
    width: 100%; /* 输入框宽度占满容器 */
    height: 24px;
    padding: 4px 28px; /* 输入框的左右内边距 */
    border-radius: 4px; /* 边角圆滑 */
    font-size: 12px; /* 字体大小 */
    background-color:#EFEFEF;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 16px;
    color: #A7B5C9;
}

.search-icon {
    position: absolute; /* 绝对定位 */
    top: 50%; /* 垂直居中 */
    left: 8px; /* 距离左边的距离 */
    transform: translateY(-50%); /* 垂直居中的调整 */
    width: 16px; /* 图标大小 */
    height: 16px; /* 图标大小 */
}

.aibot-list {
    width: 190px; /* 设置列表宽度 */
    flex-direction: column; /* 纵向排列子元素 */
    position: absolute;
    top: 50px;
}

.aibot-container1,
.aibot-container2{
    border: none; /* 去掉边框 */
    cursor: pointer; /* 鼠标光标为指针 */
    width: 189px;
    height: 50px;
    background-color: #FFFFFF;
    transition: background 0.3s; /* 添加过渡效果 */

    &:hover {
        background: #F0F0F0; /* 悬停时背景色 */
    }
}


.aibot-container1 {
    display: flex; /* 使用flex布局 */
    align-items: center; /* 垂直居中对齐 */
}

.aibot-image {
    width: 32px; /* 调整图片宽度，根据需求 */
    height: 32px; /* 自适应高度 */
    margin-right: 8px; /* 右边距 */
    margin-left: 8px;
}

.text-container {
    display: flex; /* 继续使用flex */
    flex-direction: column; /* 垂直排列文本 */
}
.text-top{
    display: flex;
}

.text-line1 {
    color: #373B52; /* 字体颜色 */
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    width: 98px;
    height: 16px;
    font-family: PingFang SC;
    text-align: left;
}
.chattime{
    font-family: PingFang SC;
    font-size: 10px;
    font-weight: 400;
    line-height: 16px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #A7B5C9;
    position: relative;
    left: 5px;

}
.text-buttom{
    display: flex;
}
.text-line2{
    color: #A7B5C9; /* 字体颜色 */
    margin: 0; /* 去掉默认边距 */
    font-family: PingFang SC;
    font-size: 10px;
    font-weight: 400;
    line-height: 16px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
}
.bot-image{
    width: 16px;
    height: 16px;
    position: relative;
    left: 19px;
}


.aichat-box {
    width: 946px; /* 右侧栏目宽度 */
    height: 768px;
    background-color: #FFFFFF; /* 示例背景色 */
}
.chattitle-box {
    display: flex; /* 使用flex布局 */
    align-items: center; /* 垂直居中对齐 */
    border-left: 1px solid #E5E8EC; /* 左侧边框 */
    border-bottom: 1px solid #E5E8EC; /* 底部边框 */
    border-top:  1px solid #E5E8EC;
    width: 946px;
    height: 50px;
}


.botname {
    font-family: PingFang SC;
    font-size: 18px;
    font-weight: 600;
    line-height: 25.2px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin-left: 24px;
    position: absolute;
    top: 13px;
}

.bottext {
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #9BA3AF;
    position: absolute;
    top: 19px;
    margin-left: 82px;
}

.petrol-icon {
    width: 16px; /* 图标宽度 */
    height: 16px; /* 自适应高度 */
    margin-left: 10px;
    position: absolute;
    top: 19px;
    margin-left: 261px;
}

.token {
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #9BA3AF;
    position: absolute;
    top: 19px;
    margin-left: 281px;
}

.recharge-button {
    background-color: #5CA9F9; /* 按钮背景颜色 */
    color: #FFFFFF; /* 按钮文本颜色 */
    border: none; /* 去掉边框 */
    border-radius: 4px; /* 按钮边角圆滑 */
    cursor: pointer; /* 鼠标样式 */
    position: absolute;
    top: 12px;
    margin-left: 862px;
    width: 60px;
    height: 27px;
}
.progressbar-box {
    width: 136px; /* 进度条外框宽度 */
    height: 4px; /* 进度条外框高度 */
    position: absolute;
    top: 48px;
    margin-left: 405px;
}

.progress-background {
    width: 100%; /* 背景条宽度 */
    height: 100%; /* 背景条高度 */
    background-color: #E5E5E5; /* 背景颜色 */
    border-radius: 2px; /* 圆角 */
}

.progress {
    height: 100%; /* 进度条高度 */
    background-color: #F7AF00; /* 进度条颜色 */
    border-radius: 2px; /* 圆角 */
}

.chat-content {
    margin-top: 16px; /* 添加顶部间距 */
    display: flex;
    flex-direction: column;
    height: 413px;
}

.message {
    display: flex;
    align-items: flex-start; /* 垂直对齐 */
    margin-bottom: 16px; /* 每条消息之间的间距 */
}

.received-message {
    flex-direction: row; /* 接收消息的方向 */
}

.sent-message {
    flex-direction: row-reverse; /* 发送消息的方向 */
}

.avatar {
    width: 32px; /* 头像宽度 */
    height: 32px; /* 头像高度 */
    border-radius: 50%; /* 圆形头像 */
    margin: 0 16px; /* 头像与文本之间的间距 */
}

.message-text {
    max-width: 480px; /* 文本框最大宽度 */
    padding: 16px 8px; /* 内边距 */
    border-radius: 8px; /* 圆角 */
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #000000;
    text-align: left;
}

.received-message .message-text {
    background-color: #F5F7F9; /* 接收消息背景色 */
}

.sent-message .message-text {
    background-color: #F5F7F9; /* 发送消息背景色 */
}

.input-container {
    border-top: 1px solid #E5E8EC;
    width: 952px;
    height: 305px;
}
.char-count {
    position: relative; /* 绝对定位 */
    color: #A7B5C9; /* 字体颜色 */
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    left: 886px;
    top: 27px;
}

.chat-input {
    width: 100%; /* 输入框宽度 */
    height: auto;
    margin-top: 55px;
    margin-left: 43px;
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #000000;
}
.chat-input::placeholder{
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #A7B5C9;
}

.sendbutton{
    width: 80px;
    height: 32px;
    border-radius: 4px;
    position: absolute;
    margin-left: 846px;
    top: 716px;
    background: #5CA9F9;
    color: #FFFFFF;
    border: none;
}


</style>
