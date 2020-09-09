<!-- 可调整尺寸、可拖动的元素 -->
<template>
    <div ref="self"
         class="element-drag-resize"
         :style="dragResizeStyle">
        <slot></slot>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getDragResizeProps, useDragResize } from './drag-resize';

export default {
    name: 'ElementDragResize',
    props: {
        ...getDragResizeProps(),
    },
    setup(props, context) {
        const self = ref(null);
        const { dragResizeStyle } = useDragResize(props, context, { self });

        return {
            self,
            dragResizeStyle,
        };
    },
};
</script>
<style lang="less" scoped>
.element-drag-resize {
    position: absolute;
    user-select: none;
}
</style>