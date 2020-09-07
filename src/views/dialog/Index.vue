<template>
    <a-button type="primary"
              @click="visible = !visible">
        Open Modal with async logic
    </a-button>
    visible: {{visible}}
    <dialog-custom v-model:visible="visible"
                   title="title"></dialog-custom>
</template>
<script>
import { ref } from 'vue';
import DialogCustom from './Custom.vue';
export default {
    name: 'DialogPage',
    components: {
        DialogCustom,
    },
    setup() {
        const visible = ref(false);
        const loading = ref(false);

        return {
            visible,
            loading,
            handleOk() {
                console.log('ok');
                loading.value = true;
                setTimeout(() => {
                    loading.value = false;
                }, 1000);
            },
        };
    },
};
</script>
<style lang="less" scoped>
// todo
</style>
