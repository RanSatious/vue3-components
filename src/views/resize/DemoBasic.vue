<!-- 基本用法 -->
<template>
    <div class="container">
        <resize-vue v-model:top="top"
                    v-model:left="left"
                    v-model:width="width"
                    v-model:height="height"
                    class="drag">
            resize me!
        </resize-vue>
    </div>
</template>
<script>
import { reactive, toRefs } from 'vue';
import ResizeVue from '../../mixins/drag-resize/Resize.vue';

export default {
    components: {
        ResizeVue,
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
    }
}
</style>