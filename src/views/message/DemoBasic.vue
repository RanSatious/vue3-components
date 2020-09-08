<template>
    <div>
        <a-button @click="alert">alert</a-button>
        <a-button @click="confirm">confirm</a-button>
    </div>
</template>
<script>
import { Message } from '../../services';
export default {
    name: 'DemoBasic',
    setup() {
        return {
            alert() {
                Message.alert('alert');
            },
            confirm() {
                Message.confirm('confirm');
            },
        };
    },
};
</script>
<style lang="less" scoped>
</style>