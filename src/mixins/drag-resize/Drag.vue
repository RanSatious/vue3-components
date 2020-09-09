<!-- 可拖拽移动的元素 -->
<template>
    <div ref="self"
         class="element-drag"
         :style="dragStyle">
        <slot></slot>
    </div>
</template>
<script>
import { ref } from 'vue';
import { getDragProps, useDrag } from './drag';

export default {
    name: 'ElementDrag',
    props: {
        ...getDragProps(),
    },
    setup(props, context) {
        const self = ref(null);
        const { dragStyle } = useDrag(props, context, {
            self,
        });
        return {
            self,
            dragStyle,
        };
    },
};
</script>
<style lang="less" scoped>
.element-drag {
    position: absolute;
    user-select: none;
}
</style>