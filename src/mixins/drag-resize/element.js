import { reactive } from 'vue';

export const useElement = (props, context) => {
    return reactive({
        // drag/resize
        action: '',
    });
};
