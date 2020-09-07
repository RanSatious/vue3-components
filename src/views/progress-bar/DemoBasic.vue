<!-- 基本用法 -->
<template>
    <div class="demo-progress">
        <se-progress-bar :percent="10"></se-progress-bar>
        <se-progress-bar :percent="20"
                         status="success"></se-progress-bar>
        <se-progress-bar :percent="30"
                         status="running"></se-progress-bar>
        <se-progress-bar :percent="40"
                         status="error"></se-progress-bar>
        <se-progress-bar :percent="40"
                         :offset="10"></se-progress-bar>
        <se-progress-bar :percent="40"
                         :stroke-height="10"></se-progress-bar>
        <se-progress-bar :percent="50"
                         :show-text="false"></se-progress-bar>
        <se-progress-bar :percent="20"
                         animation></se-progress-bar>
        <se-progress-bar animation
                         :show-text="false"></se-progress-bar>
        <se-progress-bar :percent="10">
            <i class="iconfont se-icon-zidingyi"></i>
        </se-progress-bar>
    </div>
</template>
<style lang="less" scoped>
.demo-progress {
    width: 400px;

    .progress-bar-wrapper {
        margin-bottom: 10px;
    }
}
</style>