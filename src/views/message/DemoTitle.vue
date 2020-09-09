<!-- 指定标题 -->
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
            Message.alert('Message.alert', 'alert title');
        },
        confirm() {
            Message.confirm('Message.confirm', 'confirm title');
        },
    },
};
</script>