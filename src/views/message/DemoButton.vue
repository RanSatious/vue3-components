<!-- 自定义按钮 -->
<template>
    <div>
        <a-button @click="alert">alert</a-button>
        <a-button @click="confirm">confirm</a-button>
        <a-button @click="custom">custom</a-button>
    </div>
</template>
<script>
import { Message } from '../../services';
export default {
    methods: {
        alert() {
            Message.alert('alert default button', {
                buttons: [
                    {
                        type: 'primary',
                        text: 'OK',
                        action: 'confirm',
                    },
                ],
            });
        },
        confirm() {
            Message.confirm('confirm default button', {
                buttons: [
                    {
                        type: 'info',
                        text: '取消',
                        action: 'cancel',
                    },
                    {
                        type: 'primary',
                        text: '确定',
                        action: 'confirm',
                    },
                ],
            });
        },
        custom() {
            Message.alert('custom button, see console for detail', {
                buttons: [
                    {
                        type: 'link',
                        text: '自定义',
                        handler(confirm, cancel) {
                            console.log('custom');
                            confirm();
                        },
                    },
                    {
                        type: 'danger',
                        text: '自定义2',
                        action: 'cancel',
                    },
                ],
                callback: {
                    confirm() {
                        console.log('custom confirm');
                    },
                },
            });
        },
    },
};
</script>
