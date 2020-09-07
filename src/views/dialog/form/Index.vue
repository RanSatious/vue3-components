<template>
    <div>
        <a-button @click="dialog.visible = !dialog.visible">toggle form dialog</a-button>
        <dialog-form v-model:visible="dialog.visible"
                     title="form-dialog"
                     @save="onSave"></dialog-form>
    </div>
</template>
<script>
import { reactive } from 'vue';
import DialogForm from './Form.vue';
export default {
    name: 'DemoForm',
    components: {
        DialogForm,
    },
    setup(props, context) {
        const dialog = reactive({
            visible: false,
        });
        return {
            dialog,
            onSave(form, resolve, reject) {
                console.log(form);
                setTimeout(() => {
                    resolve();
                    dialog.visible = false;
                }, 1000);
            },
        };
    },
};
</script>
<style lang="less" scoped>
// todo
</style>