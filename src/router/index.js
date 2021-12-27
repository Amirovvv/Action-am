import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('/src/pages/Home.vue'),
	},
	{
		path: '/auth',
		name: 'auth',
		component: () => import('/src/pages/Auth.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
