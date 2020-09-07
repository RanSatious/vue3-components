<template>
    <a-modal v-model:visible="localVisible"
             :title="title"
             @ok="localVisible = false">
        custom dialog
    </a-modal>
</template>
<script>
import { reactive, toRef, watchEffect } from 'vue';
import { getDialogProps, useDialog } from '../../mixins/dialog';
export default {
    name: 'CustomDialog',
    props: {
        ...getDialogProps(),
    },
    setup(props, context) {
        const { localVisible } = useDialog(props, context);
        return {
            localVisible,
        };
    },
};
</script>
<style lang="less" scoped>
// todo
</style>
