<template>
    <demo-basic></demo-basic>
    <demo-align></demo-align>
    <demo-button></demo-button>
    <demo-callback></demo-callback>
    <demo-event></demo-event>
    <demo-title></demo-title>
    <demo-width></demo-width>
</template>
<script>
import DemoAlign from './DemoAlign.vue';
import DemoBasic from './DemoBasic.vue';
import DemoButton from './DemoButton.vue';
import DemoCallback from './DemoCallback.vue';
import DemoEvent from './DemoEvent.vue';
import DemoTitle from './DemoTitle.vue';
import DemoWidth from './DemoWidth.vue';

export default {
    name: 'MessagePage',
    components: {
        DemoBasic,
        DemoAlign,
        DemoButton,
        DemoCallback,
        DemoEvent,
        DemoTitle,
        DemoWidth,
    },
};
</script>
<style lang="less" scoped>
::v-deep .ant-btn {
    margin-right: 10px;
    margin-bottom: 10px;
}
</style>