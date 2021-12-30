import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'

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

	// router.beforeEach(async (to, from, next) => {
	// 	const authPages = ['auth']
	// 	const auth = getAuth()
	// 	const authRequired = authPages.includes(to.name)
	// 	// const user = auth.currentUser()
	// 	await auth.getCurrentUser()
	// 	if (authRequired === true && auth.currentUser) {
	// 		router.push('/')
	// 	} else if (authRequired !== true && !auth.currentUser) {
	// 		next('/auth')
	// 	} else {
	// 		next()
	// 	}
	// 	console.log(auth.currentUser)
	// await auth.getCurrentUser()
	// if (authRequired === true && auth.currentUser) {
	// 	store.dispatch('authUser', auth.currentUser)
	// 	router.push('/')
	// } else if (authRequired !== true && !auth.currentUser) {
	// 	next('/auth')
	// } else {
	// 	next()
	// }
	// onAuthStateChanged(auth, (user) => {
	// 	if (authRequired === true && user) {
	// 		store.dispatch('authUser', user)
	// 		router.push('/')
	// 	} else if (authRequired !== true && !user) {
	// 		next('/auth')
	// 	} else {
	// 		next()
	// 	}
	// })
})

export default router
