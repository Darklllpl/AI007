<template>
    <div class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <div class="button-container">
                <button
                    class="notices-button"
                    :class="{ active: isNoticesActive }"
                    @click="toggleNotices"
                >
                    通知
                </button>
                <button
                    class="notices-button"
                    :class="{ active: isActivityActive }"
                    @click="toggleActivity"
                >
                    活动
                </button>
            </div>

            <div class="line"></div>

            <div class="notices-container">
                <div class="notices-box1" v-if="isNoticesActive">
                    <div class="textline1">
                        <img src="../../assets/img/tips/horn.png" alt="喇叭" class="horn-icon"/>
                        <div class="notice-text1">已有新版本更新</div>
                    </div>
                    <div class="textline2">
                        <div class="notice-text2">我是文本我是文本我是文本...</div>
                    </div>
                </div>
            </div>

            <div class="notices-container">
                <div class="notices-box1" v-if="isActivityActive">
                    <div class="textline1">
                        <img src="../../assets/img/tips/flag.png" alt="旗子" class="flag-icon"/>
                        <div class="notice-text1">我是活动1</div>
                    </div>
                    <div class="textline2">
                        <div class="notice-text2">我是文本我是文本我是文本...</div>
                        <button class="detailbutton" @click="openDetailModal">详情</button>
                    </div>
                </div>
                <!-- 可添加其他活动框 -->
            </div>

            <!-- 详情模态框 -->
            <DetailModal v-if="isDetailModalVisible" @close="closeDetailModal" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import DetailModal from './DetailModal.vue'; // 引入详情模态框

const emit = defineEmits(); // 定义 emit

const closeModal = () => {
    emit('close'); // 触发关闭事件
};

const isNoticesActive = ref(true);
const isActivityActive = ref(false);
const isDetailModalVisible = ref(false); // 控制详情模态框显示状态

const toggleNotices = () => {
    isNoticesActive.value = true;
    isActivityActive.value = false;
};

const toggleActivity = () => {
    isActivityActive.value = true;
    isNoticesActive.value = false;
};

const openDetailModal = () => {
    isDetailModalVisible.value = true; // 打开详情模态框
};

const closeDetailModal = () => {
    isDetailModalVisible.value = false; // 关闭详情模态框
};
</script>

<style lang="scss" scoped>
.modal-overlay {
    position: absolute;
    top: 0px;
    left: 0px;

    background: rgba(0, 0, 0, 0); /* 修改为半透明背景 */
    display: flex;
    z-index: 2000;

    width: 100%; /* 设置宽度填充 */
    height: 100%; /* 设置高度填充 */
}

.modal-content {
    background: white;
    border-radius: 10px;
    width: 336px; /* 设置宽度 */
    height: 476px; /* 设置高度 */
    display: flex;
    flex-direction: column; /* 纵向排列内容 */
    border: 1px solid #E5E8EC; /* 添加边框 */

    position: absolute;
    top: 220px;
    left: 40px;
}

.button-container {
    width: 110px;
    height: 24px;
    position: relative;
    top: 12px;
    left: 113px;
}

.notices-button {
    width: 50px;
    height: 24px;
    border-radius: 99px;
    border: none;
    background-color: #EEF0F2;
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: center;
    color: #6A6C7D;
    transition: background-color 0.3s, color 0.3s; /* 添加过渡效果 */

    margin-right: 10px; /* 或者可以在这里设置右边距 */
    
    &:last-child {
        margin-right: 0; /* 防止最后一个按钮有额外的间隔 */
    }

    &:hover {
        cursor: pointer;
    }
}

.notices-button.active {
    background-color: #5CA9F9; /* 激活状态背景颜色 */
    color: #FFFFFF; /* 激活状态字体颜色 */
}

.line {
    border-bottom: 2px solid #6A6C7D;
    width: 335px;
    position: absolute;
    top: 48px;
}

.notices-container {
    width: 296px;
    height: 332px;
    position: absolute;
    top: 64px;
    margin-left: 20px;
}

.notices-box1 {
    width: 296px;
    height: 74px;
    margin-bottom: 10px;
}

.textline1 {
    width: 296px;
    height: 20px;
    display: flex;
}

.horn-icon,
.flag-icon {
    width: 16px;
    height: 16px;
    margin-top: 2px;
}

.notice-text1 {
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    color: #1E223C;
    margin-left: 8px;
}

.textline2 {
    width: 296px;
    height: 46px;
    background-color: #EFEFEF;
    border-radius: 4px;
    position: relative;
    top: 8px;
}

.notice-text2 {
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.8px;
    color: #6A6C7D;
    position: relative;
    margin-left: 10.5px;
    top: 6px;
}

.detailbutton{
    border: none;
    background: none;
    color: #5CA9F9;

    &:hover {
        cursor: pointer;
    }

    position: absolute;
    margin-left: 255.5px;
    top: 23px;
}
</style>
