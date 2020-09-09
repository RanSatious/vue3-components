<!-- 自定义宽度 -->
<!-- 默认值：300 -->
<template>
    <div>
        <a-button @click="alert">alert</a-button>
        <a-button @click="confirm">confirm</a-button>
    </div>
</template>
<script>
import { Message } from '../../services';
export default {
    methods: {
        alert() {
            Message.alert('width = 400', {
                width: 400,
            });
        },
        confirm() {
            Message.confirm('width = 400', {
                width: 400,
            });
        },
    },
};
</script>