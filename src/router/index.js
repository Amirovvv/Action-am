import { createRouter, createWebHistory } from 'vue-router'
import { auth, onAuthStateChanged } from '@/firebase/firebaseConfig'

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('/src/pages/Home.vue'),
		children: [
			{
				path: ':id',
				name: 'page',
				component: () => import('/src/pages/TypePage.vue'),
			},
		],
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

router.beforeEach((to, from, next) => {
	const authPages = ['auth']
	const authRequired = authPages.includes(to.name)

	onAuthStateChanged(auth, (user) => {
		if (authRequired === true && user) {
			next('/')
		} else if (authRequired !== true && !user) {
			next('/auth')
		} else {
			next()
		}
	})
})

export default router
