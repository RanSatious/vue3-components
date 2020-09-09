<!-- 自定义行为 -->
<!-- 可在点击按钮时插入自定义的异步操作，如在点击确定时执行网络请求 -->
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
        async sleep(internal = 1000) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, internal);
            });
        },
        alert() {
            Message.alert('see console for detail', {
                callback: {
                    confirm: async () => {
                        await this.sleep();
                        console.log('custom confirm');
                    },
                },
            });
        },
        confirm() {
            Message.confirm('see console for detail', {
                callback: {
                    confirm: async () => {
                        await this.sleep();
                        throw new Error('something wrong');
                    },
                },
            });
        },
    },
};
</script>