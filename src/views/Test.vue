<template>
    <div>
        <a-button :ref="el => refs.button = el"
                  @click="test">{{refs.count}}</a-button>
    </div>
</template>
<script>
import { reactive, ref, getCurrentInstance } from 'vue';
export default {
    name: 'TestPage',
    setup() {
        const buttonRef = ref(null);
        const refs = reactive({});
        const test = function () {
            console.log(this);
        };
        return {
            test,
            buttonRef,
            refs,
        };
    },
};
</script>
<style lang="less" scoped>
// todo
</style>