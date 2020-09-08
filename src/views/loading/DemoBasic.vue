<template>
    <a-button @click="enable = !enable">toggle enable</a-button>{{enable}}
    <p>
        size:
        <a-radio-group v-model:value="size"
                       name="size">
            <a-radio value="small">
                small
            </a-radio>
            <a-radio value="default">
                default
            </a-radio>
            <a-radio value="large">
                large
            </a-radio>
        </a-radio-group>
    </p>
    <p>
        delay:
        <a-radio-group v-model:value="delay"
                       name="delay">
            <a-radio :value="0">
                0
            </a-radio>
            <a-radio :value="1000">
                1000
            </a-radio>
        </a-radio-group>
    </p>
    <p>
        tip:
        <a-radio-group v-model:value="tip"
                       name="tip">
            <a-radio value="">
                none
            </a-radio>
            <a-radio value="tip text">
                tip text
            </a-radio>
        </a-radio-group>
    </p>
    <div v-if="enable">
        <a-button @click="loading = !loading">toggle loading</a-button>{{loading}}
        <div v-segma-loading="{loading, size, delay, tip}"
             class="basic">
            asdasdasd
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
export default {
    name: 'DemoBasic',
    setup() {
        const loading = ref(false);
        const enable = ref(true);
        const size = ref('default');
        const delay = ref(0);
        const tip = ref('');
        return {
            loading,
            enable,
            size,
            delay,
            tip,
        };
    },
};
</script>
<style lang="less" scoped>
.basic {
    height: 400px;
    background-color: #f7f7f7;
}
</style>