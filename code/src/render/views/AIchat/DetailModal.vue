<template>
    <div class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <div class="head">
                <button class="close-button" @click="close">
                    <img src="../../assets/img/tips/arrow.png" alt="关闭" />
                </button>
                <div class="title">我是活动4</div>
            </div>

            <div class="line"></div>

            <div class="activities-content">
                <div class="texttitle">活动简介：</div>
                <div class="textcontent">我是活动简介我是活动简介我是活动简介我是活动简介
                    我是活动简介我是活动简介我是活动简介我是活动简介我是活动简介我是活动简介
                    我是活动简介我是活动简介我是活动简介我是活动简介我是活动简介我是活动简介
                    我是活动简介我是活动简介我是活动简介我是活动简介我是活动简介我是活动简介
                    我是活动简介我是活动简介我是活动简介我是活动简介我是活动简介我是活动简介
                    我是活动简介我是活动简介我是活动简介我是活动简介我是活动简介
                </div>
                <div class="textline1">
                    <div class="texttitle">联系人：</div>
                    <div class="textcontent">江左</div>
                </div>
                <div class="textline2">
                    <div class="texttitle">联系方式：</div>
                    <div class="textcontent">18876661526</div>
                </div>
                <div class="textline3">
                    <div class="texttitle">活动地点：</div>
                    <div class="textcontent">江苏省苏州市姑苏区拙政园</div>
                </div>
                <div class="textline4">
                    <div class="texttitle">活动时间：</div>
                    <div class="textcontent">2024.09.12 14:30～16:30</div>
                </div>
                <div class="texttitle">备注</div>
                <div class="textcontent">我是备注我是备注我是备注我是备注我是备注我是备注
                    我是备注我是备注我是备注我是备注我是备注我是备注我是备注我是备注
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';

const emit = defineEmits();

const close = () => {
    emit('close'); // 触发关闭事件
};
</script>

<style lang="scss" scoped>
.modal-overlay {
    position: absolute;
    top: 0px;
    left: 0px;

    background: rgba(0, 0, 0, 0); /* 修改为半透明背景 */
    display: flex;
    z-index: 1001;
}

.modal-content {
    background: white;
    border-radius: 10px;
    width: 336px; /* 设置宽度 */
    height: 476px; /* 设置高度 */
    display: flex;
    flex-direction: column; /* 纵向排列内容 */
    border: 1px solid #E5E8EC; /* 添加边框 */
}
.head{
    display: flex;
}

.close-button {
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 16px;
    margin-left: 21px;
}

.close-button img {
    width: 16px; /* 设置合适的宽度 */
    height: 16px; /* 设置合适的高度 */
}

.title{
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #1E223C;
    width: 65px;
    height: 20px;

    position: absolute;
    top: 14px;
    margin-left: 136px;
}

.line {
    border-bottom: 2px solid #6A6C7D;
    width: 335px;
    position: absolute;
    top: 48px;
}

.activities-content{
    width: 296px;
    height: 372px;
    position: absolute;
    top: 62px;
    left: 20px;
}

.texttitle{
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #1E223C;
    margin-bottom: 4px;
}

.textcontent{
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: justified;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #6A6C7D;
    margin-top: 2px;
}
.textline1,
.textline2,
.textline3,
.textline4{
    display: flex;
    margin-bottom: 8px;
    margin-top: 8px;
}
</style>
