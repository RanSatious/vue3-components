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
                },
            ],
        },
    ],
});

export default router;
