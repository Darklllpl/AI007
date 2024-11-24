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
                            <div class="chattime">{{ lastChatTime }}</div>
                        </div>
                        <div class="text-buttom">
                            <div class="text-line2">{{ lastText }}</div>
                            <img src="../../assets/img/AIchat/bot.png" alt="机器人" class="bot-image" />
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
                    <div class="message received-message" v-for="(msg, index) in messages" :key="index" :class="{ 'sent-message': msg.type === '0' }">
                        <img :src="msg.avatar" alt="User" class="avatar" />
                        <div class="message-text" v-html="msg.content"></div> <!-- 只保留 v-html -->
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

        <TipsModal v-if="isTipsModalVisible" @close="closeTipsModal" />
        <SettingModal v-if="isSettingModalVisible" @close="closeSettingModal" />
        <RechargeModal v-if="isRechargeModalVisible" @close="closeRecharge" />
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref, onMounted, nextTick } from 'vue';
import TipsModal from './tipsmodal.vue';  
import SettingModal from '../setting/index.vue';  
import RechargeModal from '../recharge/index.vue';
import { getChatStream, getChatList } from "@/render/api/AIchat";
import axios from "axios";

const router = useRouter();
const selectedBot = ref<string | null>(null);
const progress = ref(50);
const charCount = ref(0);
const inputMessage = ref('');
const messages = ref<{ avatar: string; content: string; type: string; }[]>([]); // 更新类型以包括content和type
const userAvatar = ref('../../assets/img/AIchat/user.png');
const botAvatar = ref('../../assets/img/AIchat/Sofia.png')
const lastChatTime = ref('');
const lastText = ref('');

const isTipsModalVisible = ref(false);
const isSettingModalVisible = ref(false);
const isRechargeModalVisible = ref(false);

const token="eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjViNjJlZjRjLTMzZGEtNDU1ZS1iMDU0LTM3ZTU1ZGI2NDQ0ZSJ9.xafO0T90--P6pMXa7q24ljW8OLIP_7NiBhbvqva_XhoHwaXwgZWVc3ZIn4GVc0Fb6JBMJ6_gNHGKlRQSYXfc6w";
// 设置请求头
const headers = {
'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`, // 替换为你的 token
};

const goHome = () => {
  router.push("/");
};

const openRecharge = () => {
    isRechargeModalVisible.value = true;
};

const closeRecharge = () => {
    isRechargeModalVisible.value = false;
};

const openTipsModal = () => {
  isTipsModalVisible.value = true;
};

const closeTipsModal = () => {
  isTipsModalVisible.value = false;
};

const opensettingModal = () => {
  isSettingModalVisible.value = true;
};

const closeSettingModal = () => {
  isSettingModalVisible.value = false;
};

const selectAIBot = (botName: string) => {
  selectedBot.value = botName;

  nextTick(() => {
        const chatContent = document.querySelector('.chat-content');
        chatContent.scrollTop = chatContent.scrollHeight;
    });
};

const updateCharCount = (event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  charCount.value = target.value.length;
};

// 发送消息的函数
const sendMessage = async () => {
  if (inputMessage.value.trim() !== '') {
    // 用户发送的消息
    messages.value.push({ 
      avatar: userAvatar.value, 
      content: inputMessage.value, 
      type: '0' 
    });

    // 自动滚动到最新消息
    nextTick(() => {
      const chatContent = document.querySelector('.chat-content');
      chatContent.scrollTop = chatContent.scrollHeight;
    });

    // 保存当前输入内容
    const messageContent = inputMessage.value;
    
    // 清空输入框和字符计数
    inputMessage.value = '';
    charCount.value = 0;

    const data = {
      content: messageContent, // 使用保存的消息内容
    };

    // 发送 POST 请求
    try {
      const response = await fetch('https://api.eliya.fun/chat/completions/stream', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error('网络请求失败:', response.statusText);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      const botMessage = {
        avatar: botAvatar.value,
        content: '',
        type: '1'
      };
      messages.value.push(botMessage);

      while (!done) {
        const { value, done: isDone } = await reader.read();
        done = isDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n'); // 将数据分割成行

          for (const line of lines) {
            if (line.startsWith('data:')) {
              const jsonData = line.substring(5).trim();
              if (jsonData) {
                try {
                  const data = JSON.parse(jsonData);
                  if (data.code === 200) {
                    const messageText = data.data.message;
                    const end = data.data.end;

                    if (messageText) {
                      // 将换行符替换为 <br />
                      botMessage.content += messageText.replace(/\n/g, '<br />');
                      messages.value[messages.value.length - 1] = { ...botMessage };

                      nextTick(() => {
                        const chatContent = document.querySelector('.chat-content');
                        chatContent.scrollTop = chatContent.scrollHeight; // 自动滚动到最新消息
                      });
                    }

                    if (end) {
                      done = true;
                    }
                  }
                } catch (error) {
                  console.error('解析返回数据失败:', error);
                }
              }
            }
          }
        }
      }

      console.log("连接已关闭");
    } catch (error) {
      console.error('请求过程中的错误:', error);
    }
  }
};



const GetChatList = async () => {
  try {
    const response = await fetch('https://api.eliya.fun/chat/list', {
      method: 'GET',
      headers: headers,
    });

    // 检查响应状态
    if (response.ok) { // 如果响应状态为200-299
      const responseData = await response.json(); // 获取 JSON 数据
      console.log(responseData);

      if (responseData.code === 200) { // 检查返回的业务状态码
        const chatData = responseData.data; // 获取聊天数据
        console.log(chatData);

        messages.value = []; // 清空现有消息
        chatData.forEach(item => {
          messages.value.push({
            avatar: item.type === '0' ? userAvatar.value : botAvatar.value,
            content: item.content,
            type: item.type
          });
        });

        // 更新最后一条消息的时间和内容
        if (chatData.length > 0) {
          const lastMessage = chatData[chatData.length - 1];
          lastChatTime.value = lastMessage.updateTime.substring(11, 16); 
          lastText.value = lastMessage.content; 
        }
      } else {
        console.error('获取聊天列表失败:', responseData.msg); // 处理业务错误
      }
    } else {
      console.error('网络请求失败:', response.statusText); // 处理网络错误
    }
  } catch (error) {
    console.error('请求过程中的错误:', error); // 处理异常
  }
};


onMounted(() => {
  GetChatList();
});
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
    height: 16px;
    width: 25px;
    margin-left: 6px;
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
    width: 98px;
    height: 16px;
    overflow: hidden;
}
.bot-image{
    width: 16px;
    height: 16px;
    margin-left: 19px;
}


.aichat-box {
    width: 946px; /* 右侧栏目宽度 */
    height: 768px;
    background-color: #FFFFFF; /* 示例背景色 */
}
.chattitle-box {
    display: flex; /* 使用flex布局 */
    align-items: center; /* 垂直居中对齐 */
    border-bottom: 1px solid #E5E8EC; /* 底部边框 */
    width: 946px;
    height: 50px;
}


.botname {
    font-family: PingFang SC;
    font-size: 18px;
    font-weight: 600;
    line-height: 25.2px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin-left: 24px;
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
    margin-top: 6px;
    margin-left: 4px;
}

.petrol-icon {
    width: 16px; /* 图标宽度 */
    height: 16px; /* 自适应高度 */
    margin-top: 5px;
    margin-left: 10px;
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
    margin-top: 5px;
    margin-left: 4px;
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
    overflow-y: auto;
    user-select: text; /* 允许选中文字 */
  -webkit-user-select: text; /* Safari 支持 */
  -moz-user-select: text; /* Firefox 支持 */
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
    cursor: pointer;
}


</style>
