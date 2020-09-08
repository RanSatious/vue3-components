<template>
    <a-modal v-model:visible="data.visible"
             :title="data.title"
             :closable="!data.loading"
             :mask-closable="!data.loading"
             :keyboard="!data.loading"
             :width="data.width"
             @ok="data.visible = false">
        {{data.message}}
        <template v-slot:footer>
            <div :style="footerStyle">
                <a-button v-for="(item, index) in data.buttons"
                          :key="index"
                          :type="item.type"
                          :loading="data.loading"
                          @click="onClick(item)">
                    {{item.text}}
                </a-button>
            </div>
        </template>
    </a-modal>
</template>
<script>
import { computed, inject, watch } from 'vue';

export default {
    name: 'MessageDialog',
    setup(props, context) {
        const data = inject('data');
        const footerStyle = computed(() => {
            return {
                'text-align': data.align,
            };
        });

        watch(
            () => data.visible,
            val => {
                if (val) {
                    context.emit('open');
                    data.confirm = false;
                } else {
                    context.emit('close', data.confirm);
                }
            }
        );

        const onCancel = async () => {
            let callback = data.callback.cancel || (() => {});
            try {
                data.loading = true;
                await callback();
                data.visible = false;
            } finally {
                data.loading = false;
            }
        };

        const onConfirm = async () => {
            let callback = data.callback.confirm || (() => {});
            try {
                data.loading = true;
                await callback();
                data.confirm = true;
                data.visible = false;
            } finally {
                data.loading = false;
            }
        };

        const actions = {
            cancel: onCancel,
            confirm: onConfirm,
        };

        const onClick = async item => {
            let action = item.handler || actions[item.action];
            if (action) {
                await action(onConfirm, onCancel);
            }
        };

        return {
            data,
            footerStyle,
            onCancel,
            onConfirm,
            onClick,
        };
    },
};
</script>
<style lang="less" scoped>
::v-deep .ant-modal-body {
    padding: 20px;
    padding-bottom: 8px;
    text-align: center;
    word-break: break-word;
}
</style>