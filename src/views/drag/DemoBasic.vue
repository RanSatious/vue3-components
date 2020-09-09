<!-- 基本用法 -->
<template>
    <div class="container">
        <drag-vue v-model:top="data.top"
                  v-model:left="data.left"
                  :step="50"
                  class="drag">
            drag me!
        </drag-vue>
    </div>
</template>
<script>
import { reactive } from 'vue';
import DragVue from './Drag.vue';

export default {
    components: {
        DragVue,
    },
    setup() {
        const data = reactive({
            top: 100,
            left: 100,
        });
        return {
            data,
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