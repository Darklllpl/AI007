<template>
    <div class="check-update-modal">
        <div class="check-update-content">
            <div class="head">
                <div class="title">退出登录</div>
                <button class="close-button" @click="close" aria-label="关闭">
                    <img src="../../assets/img/setting/close.png" alt="关闭" class="close-icon">
                </button>
            </div>

            <div class="content">
                <div class="updatetext1">是否确定退出登录？</div>
                <button class="updatebtn">退出</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';

const emit = defineEmits();

const close = () => {
    emit('close'); // 触发关闭事件
}
</script>

<style lang="scss" scoped>
.check-update-modal {
    background-color: rgba(0, 0, 0, 0); /* 半透明背景 */
    display: flex; /* 使用 flexbox 布局 */
    z-index: 1000; /* 确保在最上层 */
    position: fixed; /* 使用 fixed 定位，覆盖整个视口 */
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}

.check-update-content {
    background: white; /* 窗口背景色 */
    padding: 20px; /* 内边距 */
    border-radius: 8px; /* 圆角 */
    width: 400px; /* 宽度 */
}

.head {
    display: flex; /* 使用 flexbox 布局 */
}

.title {
    font-family: PingFang SC;
    font-size: 20px; /* 标题字体大小 */
    font-weight: 600; /* 加粗 */
    color: #373B52; /* 标题颜色 */
}

.close-button {
    background: none; /* 清除按钮背景 */
    border: none; /* 清除按钮边框 */
    cursor: pointer; /* 鼠标悬停时显示手形光标 */
    margin-left: auto; /* 自动调整到右侧 */
}

.close-icon {
    width: 24px; /* 关闭图标宽度 */
    height: 24px; /* 关闭图标高度 */
}

.updatetext1 {
    font-family: PingFang SC;
    font-size: 12px; /* 内容字体大小 */
    color: #6A6C7D; /* 内容颜色 */
    margin-top: 10px; /* 上边距 */
}

.updatebtn {
    width: 88px; /* 按钮宽度 */
    height: 31px; /* 按钮高度 */
    color: #FFFFFF; /* 字体颜色 */
    background-color: #5CA9F9; /* 按钮背景颜色 */
    border: none; /* 清除按钮边框 */
    border-radius: 6px; /* 圆角 */
    margin-top: 20px; /* 上边距 */
    cursor: pointer; /* 鼠标悬停时显示手形光标 */
    margin-left: auto; /* 自动调整位置 */
    display: block; /* 块级元素使其单独占一行 */
}
</style>
