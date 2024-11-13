<template>
    <div class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <div class="head">
                <img src="../../assets/img/setting/setting.png" alt="设置" class="setting-icon">
                <div class="title">设置</div>
                <button class="close-button" @click="closeModal" aria-label="关闭">
                    <img src="../../assets/img/setting/close.png" alt="关闭" class="close-icon">
                </button>
            </div>

            <div class="setting-content">
                <div class="sidebar">
                    <button @click="setActiveButton(1)" :class="{'active': activeButton === 1}" class="sidebutton">
                        <img 
                            src="../../assets/img/setting/settingbtn-img1.png" 
                            alt="齿轮" 
                            :class="{'filtered': activeButton === 1}" 
                            class="settingbtn-img1-icon"
                        >
                        账号信息
                    </button>
                    <button @click="setActiveButton(2)" :class="{'active': activeButton === 2}" class="sidebutton">
                        <img 
                            src="../../assets/img/setting/settingbtn-img2.png" 
                            alt="V" 
                            :class="{'filtered': activeButton === 2}" 
                            class="settingbtn-img2-icon"
                        >
                        版本
                    </button>
                    <button @click="setActiveButton(3)" :class="{'active': activeButton === 3}" class="sidebutton">
                        <img 
                            src="../../assets/img/setting/settingbtn-img3.png" 
                            alt="盾牌" 
                            :class="{'filtered': activeButton === 3}" 
                            class="settingbtn-img3-icon"
                        >
                        账号安全
                    </button>
                    <button @click="setActiveButton(4)" :class="{'active': activeButton === 4}" class="sidebutton">
                        <img 
                            src="../../assets/img/setting/sofia.png" 
                            alt="sofia" 
                            class="settingbtn-img4-icon"
                        >
                        关于我们
                    </button>
                </div>

                <div class="content">
                    <div v-if="activeContent === 'content1'">
                        <div class="content1-textline1">
                            <div class="content1-field">Cyber ID</div>
                            <div class="content1-value">hellocyber001</div>
                        </div>
                        <div class="content1-textline2">
                            <div class="content1-field">手机号</div>
                            <div class="content1-value">+86 130****5678</div>
                            <button class="changephonenumber-btn">更换手机号</button>
                        </div>
                        <div v-if="VIPstatus === 1" class="content1-textline3">
                            <div class="content1-field">会员状态</div>
                            <div class="content1-value">会员</div>
                            <img src="../../assets/img/setting/VIP.png" alt="会员" class="VIP-icon">
                            <button class="renewalVIP-btn" @click="ForbeVIP">会员续费</button>
                        </div>
                        <div v-if="VIPstatus === 2" class="content1-textline3">
                            <div class="content1-field">会员状态</div>
                            <div class="content1-value">会员</div>
                            <img src="../../assets/img/setting/notVIP.png" alt="非会员" class="VIP-icon">
                            <button class="openVIP-btn" @click="ForbeVIP">成为会员</button>
                        </div>
                        <div class="content1-textline4">
                            <div class="content1-field">使用时间</div>
                            <div class="content1-value">799 天</div>
                        </div>
                        <div class="content1-textline5">
                            <div class="content1-field">会员到期时间</div>
                            <div class="content1-value">2026年 5月 5日</div>
                        </div>
                    </div>
                    <div v-if="activeContent === 'content2'" class="content2">
                        <div class="content2-field">当前版本</div>
                        <div class="content2-textline1">
                            <div class="content2-field">Cyber App version 116.11.1</div>
                            <button class="checkupdate-btn" @click="checkForUpdates">检查更新</button>
                        </div>
                        <div class="update-title">版本更新内容</div>
                        <div class="update-content">这次版本更新了什么什么什么什么文本
                            详情文本详情文本详情文本详情文本详情文本详情，文本详情文本详情
                            文本详情文本详情文本情文本详情，文本详情文情文本详情文本详情文
                            本详情，文本详情文本详情文本详情文本详情文本详情文本详情，文本
                            详情文本详情文本详情文本详情文本详情文本详情，文本详情文本详情文
                            本详情文本详情文本详情文本详情，文本详情情文本详情文本详情文本详
                            情文本详情文本详情，
                        </div>
                    </div>
                    <div v-if="activeContent === 'content3'" class="content3">
                        <div class="content3-textline">
                            <div class="content3-field">修改密码后，您需重新登录</div>
                            <button class="content3-btn1" @click="ForModifyPassword">修改密码</button>
                        </div>
                        <div class="content3-textline">
                            <div class="content3-field">注销账号不可恢复，所有数据将被删除</div>
                            <button class="content3-btn2">注销账号</button>
                        </div>
                        <div class="content3-textline">
                            <div class="content3-field">退出当前登录账号</div>
                            <button class="content3-btn3" @click="ForExit">退出登录</button>
                        </div>
                    </div>
                    <div v-if="activeContent === 'content4'" class="content4">
                        <img src="../../assets/img/setting/sofia.png" alt="索菲娅" class="sofia-icon">
                        <div class="version">Cyber App version 116.11.1</div>
                        <div class="content4-text1">联系我们</div>
                        <div class="content4-text2">微信号：fMRI_Kevin</div>
                    </div>
                </div>
            </div>

            <!-- 此处条件渲染 checkupdate 组件 -->
            <CheckUpdate v-if="showCheckUpdate" @close="showCheckUpdate = false" />

            <Exit v-if="showExit" @close="showExit = false" />

            <ModifyPassword v-if="showModifyPassword" @close="showModifyPassword = false" />
            <beVIP v-if="showbeVIP" @close="showbeVIP = false" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import CheckUpdate from './checkupdate.vue'; // 导入 checkupdate 组件
import Exit from './exit.vue';
import ModifyPassword from'./modifyPassword.vue';
import beVIP from './beVIP.vue';

const emit = defineEmits();
const activeContent = ref('content1');
const activeButton = ref(1);
const showCheckUpdate = ref(false); // 控制 checkupdate 组件的显示
const showExit=ref(false);
const showModifyPassword=ref(false);
const showbeVIP=ref(false);
const VIPstatus = ref<number>(1); // 充值状态，1为会员，2为非会员

const closeModal = () => {
    emit('close'); // 触发关闭事件
};

const setActiveButton = (buttonNumber: number) => {
    activeButton.value = buttonNumber;
    activeContent.value = `content${buttonNumber}`;
};

const checkForUpdates = () => {
    showCheckUpdate.value = true; // 点击后显示 检查更新 窗口
};

const ForExit = () => {
    showExit.value = true; // 点击后显示 退出登录 窗口
};

const ForModifyPassword = () => {
    showModifyPassword.value = true; // 点击后显示 修改密码 窗口
};

const ForbeVIP=()=>{
    showbeVIP.value=true;// 点击后显示 成为会员 窗口
}
</script>



<style lang="scss" scoped>
.modal-overlay {
    position: fixed; /* 使用 fixed 定位 */
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0); /* 半透明背景 */
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 纵向居中 */
    z-index: 2000;
    width: 100%; /* 使用百分比填充 */
    height: 100%; /* 使用百分比填充 */
}

.modal-content {
    background: white;
    border-radius: 10px;
    width: 600px; /* 设置宽度 */
    height: 480px; /* 设置高度 */
    display: flex;
    flex-direction: column; /* 纵向排列内容 */
    overflow: hidden;
}

.head {
    display: flex; /* 使用 flex 布局 */
    width: 100%; /* 宽度填满父元素 */
    height: 54px; /* 设置高度 */
}

.setting-icon {
    width: 24px;
    height: 24px;
    margin-left: 20px; /* 距离左边20px */
    margin-top: 18px; /* 距离上面18px */
}

.title {
    font-family: PingFang SC;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    color: #373B52;
    margin-left: 14px; /* 左边留出空间 */
    margin-top: 16px; /* 距离上面16px */
}

.close-button {
    background: none; /* 清除按钮背景 */
    border: none; /* 清除按钮边框 */
    cursor: pointer; /* 鼠标悬停时显示手形光标 */
    margin-left: auto; /* 自动调整到右侧 */
}

.close-icon {
    width: 24px;
    height: 24px;
}

.setting-content {
    display: flex; /* 使用 flex 布局 */
    width: 100%; /* 宽度填充 */
    height: 100%; /* 高度填充 */
}

.sidebar {
    width: 130px; /* 侧边栏宽度 */
    background-color: #FFFFFF; /* 侧边栏背景 */
    display: flex;
    flex-direction: column; /* 纵向排列按钮 */
    border-right: 1px solid #CFD8E5; /* 侧边栏右边界 */
    padding-left: 10px;
}

.sidebutton {
    text-align: left;
    padding-left: 8px;
    width: 110px; /* 按钮宽度填充 */
    height: 40px; /* 按钮高度 */
    background-color: #FFFFFF; /* 默认背景颜色 */
    color: #373B52; /* 默认文字颜色 */
    border: none; /* 去除默认边框 */
    border-radius: 5px; /* 圆角 */
    margin-top: 12px; /* 按钮间距 */
    cursor: pointer; /* 鼠标悬停时显示手型 */
}

.active {
    background-color: #5CA9F9; /* 激活时背景色 */
    color: #FFFFFF; /* 激活时文字颜色 */
}
.settingbtn-img1-icon{
    width: 15px;
    height: 14.42px;
    margin-right: 5.5px;
}
.settingbtn-img2-icon{
    width: 15px;
    height: 15px;
    margin-right: 5.5px;
}
.settingbtn-img3-icon{
    width: 18px;
    height: 18px;
    margin-right: 4px;
}
.settingbtn-img4-icon{
    width: 18px;
    height: 18px;
    margin-right: 4px;
}
.filtered {
    filter: brightness(0) invert(1); /* 应用过滤器 */
}

.content {
    flex-grow: 1; /* 填充剩余空间 */
    background-color: white; /* 背景颜色 */
    border-left: 1px solid #ccc; /* 左边框 */
    color: #373B52;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

}
.content1-textline1{
    display: flex;
    height: 17px;
    width: 100%;
    position: absolute;
margin-top: 20px;
margin-left: 20px;
}

.content1-textline2{
    display: flex;
    height: 17px;
    width: 100%;
    position: absolute;
    margin-top: 57px;
    margin-left: 20px;
}

.content1-textline3{
    display: flex;
    height: 17px;
    width: 100%;
    position: absolute;
    margin-top: 103px;
    margin-left: 20px;
}

.content1-textline4{
    display: flex;
    height: 17px;
    width: 100%;
    position: absolute;
    margin-top: 149px;
    margin-left: 20px;
}

.content1-textline5{
    display: flex;
    height: 17px;
    width: 100%;
    position: absolute;
    margin-top: 186px;
    margin-left: 20px;
}

.content1-field{
    font-family: PingFang SC;
font-size: 12px;
font-weight: 400;
line-height: 16.8px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #6A6C7D;
width: 80px;
height: 17px;
}
.content1-value{
    font-family: PingFang SC;
font-size: 12px;
font-weight: 400;
line-height: 16.8px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #1E223C;
width: 100px;
height: 17px;
margin-left: 10px;
}

.changephonenumber-btn{
    width: 92px;
    height: 26px;
    border-radius: 6px;
    border: 1px solid #C6CFDC;
    background-color: #FFFFFF;
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 600;
    line-height: 16.8px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin-left: 150px;
    position: relative;
    bottom: 5px;
    cursor: pointer;
}

.openVIP-btn{
    width: 92px;
    height: 26px;
    border-radius: 6px;
    background-color: #5CA9F9;
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 600;
    line-height: 16.8px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #FFFFFF;
    border: none;
    margin-left: 162px;
    position: relative;
    bottom: 5px;
    cursor: pointer;
}
.renewalVIP-btn{
    width: 92px;
    height: 26px;
    border-radius: 6px;
    background-color: #5CA9F9;
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 600;
    line-height: 16.8px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #FFFFFF;
    border: none;
    margin-left: 162px;
    position: relative;
    bottom: 5px;
    cursor: pointer;
}

.VIP-icon{
    width: 60px;
    height: 21px;
    position: relative;
    margin-left: -72px;
    bottom: 2px;
}

.content2{
    padding-left: 20px;
    padding-top: 20px;
}

.content2-textline1{
    display: flex;
    margin-top: 10px;
    margin-bottom: 23px;
}

.content2-field{
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #373B52;
}

.checkupdate-btn{
    width: 92px;
    height: 26px;
    border-radius: 6px;
    background-color: #5CA9F9;
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 600;
    line-height: 16.8px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #FFFFFF;
    border: none;
    margin-left: 155px;
    position: relative;
    bottom: 5px;
    cursor: pointer;
}
.update-title{
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #373B52;
    margin-bottom: 10px;
}

.update-content{
    width: 430px;
    height: 270px;
    border: 1px solid #E0E2E6;
    border-radius: 4px;
    padding-top: 12px;
    padding-left: 14px;
    padding-right: 14px;
}

.content3{
    padding-left: 20px;
    padding-top: 20px;
}

.content3-textline{
    width: 430px;
    height: 26px;
    margin-bottom: 10px;
    display: flex;
}

.content3-field{
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #373B52;
    width: 204px;
    margin-right: 134px;
}

.content3-btn1{
    border: 1px solid #C6CFDC;
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 600;
    line-height: 16.8px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    border-radius: 6px;
    color: #1E223C;
    background-color: #FFFFFF;
    position: relative;
    bottom: 4px;
    width: 92px;
    height: 26px;
    cursor: pointer;
}
.content3-btn2{
    border: 1px solid #F53126;
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 600;
    line-height: 16.8px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    border-radius: 6px;
    color: #F53126;
    background-color: #FFFFFF;
    position: relative;
    bottom: 4px;
    width: 92px;
    height: 26px;
    cursor: pointer;
}
.content3-btn3{
    border: 1px solid #C6CFDC;
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 600;
    line-height: 16.8px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    border-radius: 6px;
    color: #1E223C;
    background-color: #FFFFFF;
    position: relative;
    bottom: 4px;
    width: 92px;
    height: 26px;
    cursor: pointer;
}

.content4{
    padding-top: 80px;
}
.sofia-icon{
    width: 80px;
    height: 80px;
    margin-left: 195px;
}
.version{
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 600;
    line-height: 19.6px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #373B52;
}

.content4-text1{
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 600;
    line-height: 19.6px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #373B52;
    margin-top: 100px;
}

.content4-text2{
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

    color: #373B52;
    margin-top: 10px;
}
</style>
