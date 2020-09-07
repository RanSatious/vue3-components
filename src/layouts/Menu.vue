<template>
    <ul class="nav-list">
        <li v-for="item in routes"
            :key="item.name">
            <router-link :to="{name: item.name}">
                {{item.name}}
            </router-link>
        </li>
    </ul>
</template>
<script>
import { useRouter } from 'vue-router';
export default {
    name: 'NavMenu',
    setup() {
        const router = useRouter();
        const routes = router.getRoutes().filter(d => d.meta.page);

        return {
            routes,
        };
    },
};
</script>
<style lang="less" scoped>
@import '../assets/css/page.less';

.nav-list {
    list-style: none;
    margin: 0;
    padding: 0;

    a {
        display: block;
        padding: 4px 10px;

        &.router-link-active,
        &:hover {
            color: @color-primary;
            background: @color-primary-hover;
        }
    }
}
</style>
