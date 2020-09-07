<template>
    <a-modal v-model:visible="localVisible"
             :title="title"
             :ok-button-props="{loading}"
             :cancel-button-props="{loading}"
             :closable="!loading"
             :mask-closable="false"
             @ok="submit">
        <a-form ref="formRef"
                :model="form"
                :rules="rules">
            <a-form-item name="name"
                         label="name">
                <a-input v-model:value="form.name"></a-input>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script>
import { reactive } from 'vue';
import { getDialogFormProps, useDialogForm } from '../../../mixins/dialog-form';
export default {
    name: 'DialogForm',
    props: {
        ...getDialogFormProps(),
    },
    setup(props, context) {
        return {
            rules: {
                name: [{ required: true, message: '请输入name' }],
            },
            ...useDialogForm(props, context, {
                form: reactive({
                    name: 'name'
                })
            })
        };
    },
};
</script>
<style lang="less" scoped>
// todo
</style>
