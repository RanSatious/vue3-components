import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/Default.vue';
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/layout-default',
            component: DefaultLayout,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('../views/Home.vue'),
                    meta: {
                        page: true,
                    },
                },
                {
                    path: '/dialog',
                    name: 'dialog',
                    component: () => import('../views/dialog/Index.vue'),
                    meta: {
                        page: true,
                    },
                },
                {
                    path: '/icon-font',
                    name: 'iconFont',
                    component: () => import('../views/icon-font/Index.vue'),
                    meta: {
                        page: true,
                    },
                },
                {
                    path: '/progress-bar',
                    name: 'progressBar',
                    component: () => import('../views/progress-bar/Index.vue'),
                    meta: {
                        page: true,
                    },
                },
                {
                    path: '/loading',
                    name: 'loading',
                    component: () => import('../views/loading/Index.vue'),
                    meta: {
                        page: true,
                    },
                },
                {
                    path: '/title',
                    name: 'title',
                    component: () => import('../views/title/Index.vue'),
                    meta: {
                        page: true,
                    },
                },
                {
                    path: '/message',
                    name: 'message',
                    component: () => import('../views/message/Index.vue'),
                    meta: {
                        page: true,
                    },
                },
                {
                    path: '/drag',
                    name: 'drag',
                    component: () => import('../views/drag/Index.vue'),
                    meta: {
                        page: true,
                    },
                },
                {
                    path: '/test',
                    name: 'test',
                    component: () => import('../views/Test.vue'),
                    meta: {
                        page: true,
                    },
                },
            ],
        },
    ],
});

export default router;
