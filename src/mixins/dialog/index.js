import { computed } from 'vue';

export const getDialogProps = () => {
    return {
        // 标题
        title: {
            type: String,
            default: '',
        },
        // 是否可见
        visible: {
            type: Boolean,
            default: false,
        },
    };
};
export const useDialog = (props, context) => {
    const localVisible = computed({
        get() {
            return props.visible;
        },
        set(val) {
            context.emit('update:visible', val);
        },
    });

    return {
        localVisible,
    };
};
