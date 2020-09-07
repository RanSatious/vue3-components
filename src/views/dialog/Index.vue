<template>
    <p>
        <a-button type="primary"
                  @click="visible = !visible">
            Open Modal
        </a-button>
        visible: {{visible}}
        <dialog-custom v-model:visible="visible"
                       title="title"></dialog-custom>
    </p>
    <p>
        <a-button type="primary"
                  @click="dialog.visible = !dialog.visible">
            Open Modal
        </a-button>
        visible: {{dialog.visible}}
        <dialog-custom v-model:visible="dialog.visible"
                       title="title"></dialog-custom>
    </p>
    <demo-form></demo-form>
</template>
<script>
import { reactive, ref } from 'vue';
import DialogCustom from './Custom.vue';
import DemoForm from './form/Index.vue';
export default {
    name: 'DialogPage',
    components: {
        DialogCustom,
        DemoForm,
    },
    setup() {
        const visible = ref(false);
        const loading = ref(false);
        const dialog = reactive({
            visible: false,
            loading: false,
        });

        return {
            visible,
            loading,
            dialog,
        };
    },
};
</script>
<style lang="less" scoped>
// todo
</style>
