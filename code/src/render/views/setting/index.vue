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
                    <button @click="showContent('content1')"class="sidebutton">账号信息</button>
                    <button @click="showContent('content2')" class="sidebutton">版本</button>
                    <button @click="showContent('content3')"class="sidebutton">账号安全</button>
                    <button @click="showContent('content4')"class="sidebutton">关于我们</button>
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
                        <div class="content1-textline3">
                            <div class="content1-field">会员状态</div>
                            <div class="content1-value">会员</div>
                            <img src="../../assets/img/setting/VIP.png" alt="会员" class="VIP-icon">
                            <button class="openVIP-btn">会员续费</button>
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
                    <div v-if="activeContent === 'content2'">这里是内容 2</div>
                    <div v-if="activeContent === 'content3'">这里是内容 3</div>
                    <div v-if="activeContent === 'content4'">这里是内容 4</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(); // 定义 emit
const activeContent = ref('content1'); // 默认显示内容1

const closeModal = () => {
    emit('close'); // 触发关闭事件
};

const showContent = (content: string) => {
    activeContent.value = content; // 根据按钮设置活动内容
};

</script>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed; /* 使用 fixed 定位 */
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5); /* 半透明背景 */
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
    margin-left: 462px;
    margin-top: 0px; /* 距离上面18px */
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
    padding: 10px; /* 内边距 */
    display: flex;
    flex-direction: column; /* 纵向排列按钮 */
    border-right: 1px solid var(--, #CFD8E5)
}

.sidebutton{
    text-align: left;
    padding-left: 30px;
}

.sidebar button {
    width: 100%;
    height: 40px;
    margin-top: 12px; /* 按钮间距 */
    background-color: #FFFFFF; /* 按钮背景颜色 */
    color: #373B52; /* 按钮文字颜色 */
    border: none; /* 去除默认边框 */
    border-radius: 5px; /* 圆角 */
    cursor: pointer; /* 鼠标悬停时显示手型 */
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
}

.VIP-icon{
    width: 60px;
    height: 21px;
    position: relative;
    margin-left: -72px;
    bottom: 2px;
}
</style>
