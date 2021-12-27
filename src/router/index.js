import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import store from '../store'

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

router.beforeResolve((to, from, next) => {
	const authPages = ['auth']
	const auth = getAuth()
	const authRequired = authPages.includes(to.name)

	onAuthStateChanged(auth, (user) => {
		if (authRequired === true && user) {
			store.dispatch('authUser', user)
			router.push('/')
		} else if (authRequired !== true && !user) {
			next('/auth')
		} else {
			next()
		}
	})
})

export default router
