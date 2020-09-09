<!-- 可调整尺寸的元素 -->
<template>
    <div ref="self"
         class="element-resize"
         :style="resizeStyle">
        <slot></slot>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getResizeProps, useResize } from './resize';
export default {
    name: 'ElementResize',
    props: {
        ...getResizeProps(),
    },
    setup(props, context) {
        const self = ref(null);
        let { resizeStyle } = useResize(props, context, {
            self,
        });
        return {
            resizeStyle,
            self,
        };
    },
};
</script>
<style lang="less" scoped>
.element-resize {
    position: absolute;
    user-select: none;
}
</style>