import { getResizeProps, useResize } from './resize';
import { getDragProps, useDrag } from './drag';
import { computed } from 'vue';
import { useElement } from './element';

export const getDragResizeProps = () => {
    return {
        ...getResizeProps(),
        ...getDragProps(),
    };
};

export const useDragResize = (props, context, { self }) => {
    const element = useElement(props, context);
    const resize = useResize(props, context, { self, element });
    const drag = useDrag(props, context, { self, element });

    return {
        dragResizeStyle: computed(() => {
            if (element.action === 'drag') {
                let { top, left, ...rest } = resize.resizeStyle.value;
                return {
                    ...drag.dragStyle.value,
                    ...rest,
                };
            }
            return resize.resizeStyle.value;
        }),
    };
};
