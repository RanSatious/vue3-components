<template>
    <a-layout>
        <a-layout-header>
            <router-link :to="{name: 'home'}"
                         class="title">Segma Vue Components</router-link>
        </a-layout-header>
        <a-layout>
            <a-layout-sider>
                slider
            </a-layout-sider>
            <a-layout-content>
                <div class="content">
                    <router-view></router-view>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
export default {
    name: 'DefaultLayout',
};
</script>
<style lang="less" scoped>
.ant-layout {
    height: 100%;
}
.ant-layout-header {
    background-color: #fff;
    border-bottom: 1px solid #f7f7f7;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;

    .title {
        font-size: 18px;
        font-weight: bold;
    }
}

.ant-layout-sider {
    background-color: #fff;
    padding: 10px;
    border-right: 1px solid #f7f7f7;
}

.ant-layout-content {
    padding: 10px;

    > .content {
        box-sizing: border-box;
        background-color: #fff;
        padding: 10px;
        height: 100%;
    }
}
</style>
