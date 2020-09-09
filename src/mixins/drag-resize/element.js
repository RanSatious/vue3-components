import { reactive } from 'vue';

export const useElement = (props, context) => {
    const element = reactive({
        // drag/resize
        action: '',
    });
    return {
        element,
    };
};
