<!-- 按钮对齐 -->
<!-- 可选值：`left`/`center`/`right` -->
<!-- `alert`方法默认`center`对齐 -->
<!-- `confirm`方法默认`right`对齐 -->
<template>
    <div>
        <a-button @click="alert">right</a-button>
        <a-button @click="confirm">center</a-button>
    </div>
</template>
<script>
import { Message } from '../../services';
export default {
    methods: {
        alert() {
            Message.alert('align = right', {
                align: 'right',
            });
        },
        confirm() {
            Message.confirm('align = center', {
                align: 'center',
            });
        },
    },
};
</script>
<style lang="less" scoped>
.ant-btn {
    margin-right: 10px;
}
</style>