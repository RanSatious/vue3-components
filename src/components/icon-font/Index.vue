<!-- 封装iconfont图标 -->
<template>
    <span class="icon">
        <svg aria-hidden="true">
            <use :xlink:href="`#${name}`"></use>
        </svg>
    </span>
</template>
<script>
import './icon';

export default {
    // SVG图标
    name: 'IconFont',
    props: {
        // 图标名称
        name: {
            type: String,
            default: '',
        },
    },
};
</script>
<style lang="less" scoped>
.icon {
    svg {
        overflow: hidden;
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
    }
}
</style>
