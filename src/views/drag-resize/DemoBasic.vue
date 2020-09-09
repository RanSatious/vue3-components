<!-- 基本用法 -->
<template>
    <div class="container">
        <drag-resize-vue v-model:top="top"
                         v-model:left="left"
                         v-model:width="width"
                         v-model:height="height"
                         class="drag">
            drag and resize me!
        </drag-resize-vue>
    </div>
</template>
<script>
import { reactive, toRefs } from 'vue';
import DragResizeVue from '../../mixins/drag-resize/DragResize.vue';

export default {
    components: {
        DragResizeVue,
    },
    setup() {
        const data = reactive({
            top: 100,
            left: 100,
            width: 200,
            height: 200,
        });
        return {
            ...toRefs(data),
        };
    },
};
</script>
<style lang="less" scoped>
.container {
    height: 600px;
    position: relative;
    background-color: #f7f7f7;

    .drag {
        background-color: #fff;
        width: 100px;
        height: 100px;
        cursor: move;
        white-space: nowrap;
    }
}
</style>