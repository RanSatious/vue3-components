import { getDialogProps, useDialog } from '../dialog';
import { ref, reactive } from 'vue';

export const getDialogFormProps = () => {
    return {
        ...getDialogProps(),
        // 传入组件的数据，通常在执行编辑某个项目，打开对话框时使用
        data: {
            type: Object,
            default: () => ({}),
        },
    };
};

export const useDialogForm = (props, context, { save, form = reactive({}) } = {}) => {
    // 加载状态
    const loading = ref(false);
    // 表单数据
    const formRef = ref(null);

    /**
     * 提交表单，默认会触发`save`事件，如果组件定义了save方法，会覆盖默认行为
     * @returns {Promise}
     */
    const submit = async () => {
        if (loading.value) {
            return;
        }

        try {
            loading.value = true;

            let result = {};
            if (formRef.value) {
                await formRef.value.validate();
                result = formRef.value.getFieldsValue();
            }

            if (typeof save === 'function') {
                await save(result);
            } else {
                await new Promise((resolve, reject) => {
                    /**
                     * 提交表单时触发
                     * @param {object} form 表单数据
                     * @param {() => void} resolve 回调函数，回调操作成功时调用
                     * @param {() => void} reject 回调函数，回调操作失败时调用
                     */
                    context.emit('save', result, resolve, reject);
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        form,
        formRef,
        submit,
        ...useDialog(props, context),
    };
};
