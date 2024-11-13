<template>
    <div class="check-update-modal">
        <div class="check-update-content">
            <div class="head">
                <div class="title">检查更新</div>
                <button class="close-button" @click="close" aria-label="关闭">
                    <img src="../../assets/img/setting/close.png" alt="关闭" class="close-icon">
                </button>
            </div>

            <!-- 根据 checkStatus 变量条件渲染内容 -->
            <div v-if="checkStatus === 'latest'" class="content1">
                <img src="../../assets/img/setting/tick.png" alt="蓝勾" class="tick-icon">
                <div class="updatetext1">当前已是最新版本</div>
            </div>

            <div v-else-if="checkStatus === 'updateAvailable'" class="content2">
                <div class="updatetext2">可更新至</div>
                <div class="updatetext3">Cyber App version 116.11.1</div>
                <button class="updatebtn">更新</button>
            </div>
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
    text-align: center; /* 内容居中 */

    width: 400px;
    height: 205px;
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
.tick-icon{
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
}

.updatetext1{
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #6A6C7D;
}

.updatetext2{
    font-family: PingFang SC;
font-size: 14px;
font-weight: 400;
line-height: 19.6px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #373B52;
margin-top: 20px;
}

.updatetext3{
    font-family: PingFang SC;
font-size: 14px;
font-weight: 400;
line-height: 19.6px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #373B52;
margin-top: 10px;
}

.updatebtn{
    width: 88px;
    height: 31px;
    color: #FFFFFF;
    background-color: #5CA9F9;
    border: none;
    border-radius: 6px;
    margin-top: 20px;
    align-self: flex-end;
    margin-left: 244px;
    cursor: pointer;
}

</style>
